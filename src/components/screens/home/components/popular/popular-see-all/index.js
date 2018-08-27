import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import PopularSeeAllItemList from './PopularSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const data = [{
  id: '1',
  foodTitle: 'Lamb Burger',
  reviews: 12,
  stars: 5,
  distance: 12,
  description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
  foodImage: 'https://statics.jennycraig.com/images/products/0405-045_small.jpg',
  price: parseFloat(22.90).toFixed(2),
  isDataFetched: true,
},
{
  id: '4',
  foodTitle: 'Lamb Burger',
  reviews: 12,
  stars: 5,
  distance: 12,
  description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
  foodImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5a5_tS0s_SnrdMsLapahfjDhhzGcBqJ1DwLbE7a4YXlDZdN1dA',
  price: parseFloat(22.90).toFixed(2),
  isDataFetched: true,
},
{
  id: '2',
  foodTitle: 'Lamb Burger',
  reviews: 12,
  stars: 5,
  distance: 12,
  description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
  foodImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlX0NmVmoHwA0CYh5kRtrCWs1YdmvBrYQDt6DtNVoaR8ZKCs8fQ',
  price: parseFloat(22.90).toFixed(2),
  isDataFetched: true,
},
{
  id: '23',
  foodTitle: 'Lamb Burger',
  reviews: 12,
  stars: 5,
  distance: 12,
  description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
  foodImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqGNJevSVzjR-gcy29I9A7Z_oduPRQxvaFePJ5ppNicnSjFgo',
  price: parseFloat(22.90).toFixed(2),
  isDataFetched: true,
}];

const PopularSeeAll = () => (
  <List
    showsVerticalScrollIndicator={false}
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <PopularSeeAllItemList
        foodTitle={item.foodTitle}
        reviews={item.reviews}
        stars={item.stars}
        distance={item.distance}
        description={item.description}
        foodImage={item.foodImage}
        price={item.price}
        isDataFetched={item.isDataFetched}
      />
    )}
  />
);

PopularSeeAll.navigationOptions = () => ({
  title: 'Popular',
  headerStyle: {
    backgroundColor: appStyle.colors.primaryColor,
    borderBottomWidth: 0,
  },
  headerTintColor: appStyle.colors.defaultWhite,
  headerTitleStyle: {
    color: appStyle.colors.defaultWhite,
    fontFamily: 'CircularStd-Black',
    fontSize: appStyle.metrics.navigationHeaderFontSize,
  },
});

export default PopularSeeAll;
