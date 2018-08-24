// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  margin-bottom: ${({ theme }) => `${theme.metrics.smallSize}px`}
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
`;

const FoodImage = styled(Image).attrs({
  source: ({ foodImage }) => ({ uri: foodImage }),
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const TextContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  padding-left: ${({ theme }) => theme.metrics.smallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  height: 100%;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Book;
`;

const FlagsContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  align-items: center;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;

const FlagStars = styled(View)`
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 50px;
`;

const Stars = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.2%')}px;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Bold;
`;

const IconStar = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'star',
  size: 12,
})`
  width: 12px;
  height: 12px;
`;

const FlagStarsContent = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
`;

type Props = {
  foodTitle: string,
  foodDescription: string,
  foodImage: string,
  price: number,
  stars: number,
  navigation: Function,
}

const onPressItem = (payload: Object, navigation: Function): void => {
  navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, { payload });
};

const renderTextContent = (foodTitle: string, foodDescription: string): Object => (
  <TextContent>
    <FoodTitle>
      {foodTitle}
    </FoodTitle>
    <FoodDescription>
      {foodDescription}
    </FoodDescription>
  </TextContent>
);

const renderFlagContent = (stars: number, price: number): Object => (
  <FlagsContent>
    <FlagStars>
      <FlagStarsContent>
        <IconStar />
        <Stars>
          {stars}
        </Stars>
      </FlagStarsContent>
    </FlagStars>
    <FlagPrice price={price} />
  </FlagsContent>
);

const MenuListItem = ({
  foodTitle,
  foodDescription,
  foodImage,
  price,
  stars,
  navigation,
}: Props) => {
  const navigationParams = {
    mode: 'detail',
    foodTitle,
    foodDescription,
    foodImage,
    price,
    stars,
  };

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => onPressItem(navigationParams, navigation)}
      >
        <ContentWrapper>
          <FoodImage foodImage={foodImage} />
          {renderTextContent(foodTitle, foodDescription)}
          {renderFlagContent(stars, price)}
        </ContentWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default withNavigation(MenuListItem);
