// @flow

import React from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  Text,
  View,
} from 'react-native';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  margin-bottom: ${({ theme }) => `${theme.metrics.smallSize}px`}
  padding: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize};
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DishImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DishTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const DishDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '4.35%' : '4%');
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Book;
`;

const TextContent = styled(View)`
  width: 75%;
  height: 100%;
  padding: ${({ theme }) => `0 0 ${theme.metrics.smallSize}px ${theme.metrics.smallSize}px`};
`;

type Props = {
  description: string,
  imageURL: string,
  title: string,
  price: number,
  stars: number,
};

const onPressItem = (props: Object): void => {
  const { navigation } = props;

  const payload = {
    ...props,
  };

  delete payload.navigation;

  navigation.navigate(ROUTE_NAMES.FOOD_DETAIL_REVIEW, { payload });
};

const FirstRow = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const renderFirstRow = (title: string, price: number): Object => (
  <FirstRow>
    <DishTitle>
      {title}
    </DishTitle>
    <FlagPrice
      price={price}
    />
  </FirstRow>
);

const renderMainText = (price: number, stars: number, title: string, description: string): Object => (
  <TextContent>
    {renderFirstRow(title, price)}
    <ReviewStars
      stars={stars}
    />
    <DishDescription>
      {description}
    </DishDescription>
  </TextContent>
);

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
      elevation: 5,
      shadowOffset: {
        width: 2,
        height: -3,
      },
      shadowRadius: 5,
      shadowOpacity: -4.0,
    },
  }),
};

const MenuListItem = (props: Props): Object => {
  const {
    description,
    imageURL,
    price,
    stars,
    title,
  } = props;

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => onPressItem(props)}
      >
        <ContentWrapper
          style={{ ...shadowStyle }}
        >
          <DishImage
            imageURL={imageURL}
          />
          {renderMainText(price, stars, title, description)}
        </ContentWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default withNavigation(MenuListItem);
