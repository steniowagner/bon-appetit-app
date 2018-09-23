import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px
`;

const CardContainer = styled(View)`
  width: 65%;
  height: 80%;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const DisheImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 25%;
  height: 100%;
`;

const TopRowWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const DishTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('38%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '3%' : '2.6%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Black;
`;

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.5%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Book;
`;

const ArrowButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  margin-left: -24px;
  background-color: ${({ theme }) => theme.colors.red};
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'arrow-right',
  size: 28,
})`
  width: 28px;
  height: 28px;
`;

const shadowStyle = {
  ...Platform.select({
    ios: {
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 3,
      shadowOpacity: 0.35,
    },
    android: {
      elevation: 4,
      shadowOffset: {
        width: 1,
        height: -3,
      },
      shadowRadius: 2,
      shadowOpacity: 5.0,
    },
  }),
};

const onPressArrowButton = (navigation: Object, imageURL: string, id: string) => {
  navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
    payload: { imageURL, id },
  });
};

const renderDisheImage = (imageURL: string) => (
  <DisheImage
    imageURL={imageURL}
  />
);

const renderAboutDishe = (disheInfo: Object) => {
  const {
    title,
    stars,
    description,
    price,
  } = disheInfo;

  return (
    <Fragment>
      <TopRowWrapper>
        <DishTitle>
          {title}
        </DishTitle>
        <View>
          <FlagPrice
            price={price}
          />
        </View>
      </TopRowWrapper>
      <ReviewStars
        stars={stars}
      />
      <DisheDescription>
        {description}
      </DisheDescription>
    </Fragment>
  );
};

const renderArrowButton = (navigation: Object, imageURL: string, id: string): Object => (
  <ArrowButton
    onPress={() => onPressArrowButton(navigation, imageURL, id)}
    style={{ ...shadowStyle }}
  >
    <ArrowIcon />
  </ArrowButton>
);

const PopularSeeAllItemList = ({
  description,
  navigation,
  imageURL,
  title,
  stars,
  price,
  id,
}: Object): Object => (
  <Container>
    {renderDisheImage(imageURL)}
    <CardContainer
      style={{ ...shadowStyle }}
    >
      {renderAboutDishe({
        title,
        stars,
        description,
        price,
      })}
    </CardContainer>
    {renderArrowButton(navigation, imageURL, id)}
  </Container>
);

export default withNavigation(PopularSeeAllItemList);
