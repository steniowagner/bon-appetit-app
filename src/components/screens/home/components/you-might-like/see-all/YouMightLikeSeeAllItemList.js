// @flow

import React from 'react';
import {
  TouchableWithoutFeedback, Platform, Text, View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';

import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';
import ReviewStars from '~/components/common/ReviewStars';
import FlagPrice from '~/components/common/FlagPrice';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const getTextSize = (type: string): number => {
  const sizes = {
    title: Platform.OS === 'android' ? '6.5%' : '5%',
    default: Platform.OS === 'android' ? '5%' : '4.5%',
  };

  return appStyles.metrics.getWidthFromDP(sizes[type]);
};

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  margin-bottom: ${({ hasBottomMargin, theme }) => (hasBottomMargin ? theme.metrics.extraSmallSize : 0)}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const FlagPriceWrapper = styled(View)`
  align-self: flex-end;
`;

const DisheImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const DisheImage = styled(FastImage).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 100%;
`;

const TextContentWrapper = styled(View)`
  width: 100%;
  height: 80%;
  justify-content: flex-end;
`;

const DisheTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  width: 100%;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: 20px;
  fontfamily: CircularStd-Black;
`;

const DistanceWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('1%')}px;
`;

const RestaurantDistance = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${getTextSize('default')}px;
  fontfamily: CircularStd-Medium;
`;

const MapIcon = styled(Icon).attrs({
  name: 'map-marker',
  size: 18,
})`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

type Props = {
  hasBottomMargin: boolean,
  navigation: Function,
  imageURL: string,
  reviews: number,
  title: string,
  price: number,
  stars: number,
  id: string,
};

const renderTextContent = (
  title: string,
  stars: number,
  reviews: number,
): Object => (
  <TextContentWrapper>
    <DisheTitle>{title}</DisheTitle>
    <ReviewStars
      textColor="defaultWhite"
      shouldShowReviewsText
      reviews={reviews}
      stars={stars}
    />
    <DistanceWrapper>
      <MapIcon />
      <RestaurantDistance>
        {`${parseFloat(reviews / stars).toFixed(1)} km from you`}
      </RestaurantDistance>
    </DistanceWrapper>
  </TextContentWrapper>
);

const RecommendedSeeAllItemList = ({
  hasBottomMargin,
  navigation,
  imageURL,
  reviews,
  price,
  title,
  stars,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => {
      navigation.navigate(ROUTE_NAMES.DISH_DETAIL, {
        [CONSTANTS.NAVIGATION_PARAM_IS_DISH_DETAIL_REVIEW_MODE]: true,
        [CONSTANTS.NAVIGATION_PARAM_ID]: id,
      });
    }}
  >
    <Container
      hasBottomMargin={hasBottomMargin}
    >
      <DisheImageWrapper>
        <DisheImage
          imageURL={imageURL}
        />
      </DisheImageWrapper>
      <DarkLayer>
        <FlagPriceWrapper>
          <FlagPrice
            price={price}
          />
        </FlagPriceWrapper>
        {renderTextContent(title, stars, reviews)}
      </DarkLayer>
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(RecommendedSeeAllItemList);
