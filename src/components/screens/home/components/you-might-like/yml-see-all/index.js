import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import YMLSeeAllItemList from './YMLSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const data = [{
  id: '1',
  foodImageURL: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3694576331e527eb0933b269a6fc40fb&auto=format&fit=crop&w=345&q=80',
  price: parseFloat(35.90).toFixed(2),
  foodTitle: 'Bife del Primo',
  stars: 3.5,
  foodDescription: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos,',
  isOpen: false,
  distance: 3.5,
  isDataFetched: true,
  reviews: 7,
},{
  id: '2',
  foodImageURL: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9647d95a500b5e222258fb03ed086ed1&auto=format&fit=crop&w=400&q=80',
  price: parseFloat(35.90).toFixed(2),
  foodTitle: 'Bife del Primo',
  stars: 3.5,
  foodDescription: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos,',
  isOpen: true,
  distance: 3.5,
  isDataFetched: true,
  reviews: 7,
}, {
  id: '3',
  foodImageURL: 'https://images.unsplash.com/photo-1505253468034-514d2507d914?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=140e2054487a8f6f092fd6cda183cfac&auto=format&fit=crop&w=334&q=80',
  price: parseFloat(35.90).toFixed(2),
  foodTitle: 'Bife del Primo',
  stars: 3.5,
  foodDescription: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos,',
  isOpen: true,
  distance: 3.5,
  isDataFetched: true,
  reviews: 7,
}];

const PopularSeeAll = () => (
  <List
    showsVerticalScrollIndicator={false}
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <YMLSeeAllItemList
        foodImageURL={item.foodImageURL}
        price={item.price}
        foodTitle={item.foodTitle}
        stars={item.stars}
        foodDescription={item.foodDescription}
        isOpen={item.isOpen}
        distance={item.distance}
        isDataFetched={item.isDataFetched}
        reviews={item.reviews}
      />
    )}
  />
);

PopularSeeAll.navigationOptions = () => ({
  title: 'You Might Like',
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
