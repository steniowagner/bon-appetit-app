// @flow

import React from 'react';
import {
  TouchableWithoutFeedback,
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
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  height: 100%;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize};
`;

const FlagPriceWrapper = styled(View)`
  align-self: flex-end;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 70%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DishImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 70%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DishTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  fontFamily: CircularStd-Medium;
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

const MenuListItem = (props: Props): Object => {
  const {
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
        <View>
          <DishImage
            imageURL={imageURL}
          />
          <DarkLayer>
            <FlagPriceWrapper>
              <FlagPrice
                price={price}
              />
            </FlagPriceWrapper>
          </DarkLayer>
          <DishTitle>
            {title}
          </DishTitle>
          <ReviewStars
            shouldShowReviewsText
            textColor="darkText"
            stars={stars}
            reviews={12}
            small
          />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default withNavigation(MenuListItem);
