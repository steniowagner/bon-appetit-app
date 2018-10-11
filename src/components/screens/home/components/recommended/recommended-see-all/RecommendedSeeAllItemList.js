import React from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const getTextSize = (type: string): number => {
  const sizes = {
    title: (Platform.OS === 'android' ? '6.5%' : '6%'),
    default: (Platform.OS === 'android' ? '5%' : '4.5%'),
  };

  return appStyles.metrics.getWidthFromDP(sizes[type]);
};

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  border-radius: 4px;
`;

const FlagPriceWrapper = styled(View)`
  align-self: flex-end;
`;

const DisheImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
`;

const DisheImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
  resizeMode: 'cover',
})`
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
  font-size: ${getTextSize('title')}px;
  fontFamily: CircularStd-Black;
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
  fontFamily: CircularStd-Medium;
`;

const MapIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 18,
})`
  width: 18px;
  height: 18px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  imageURL: string,
  title: string,
  id: string,
  reviews: number,
  price: number,
  stars: number,
  navigation: Function,
};

const onPressItem = (navigation: Function, imageURL: string, id: string): void => {
  navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
    payload: { imageURL, id },
  });
};

const renderTextContent = (title: string, stars: number, reviews: number): Object => (
  <TextContentWrapper>
    <DisheTitle>
      {title}
    </DisheTitle>
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

const renderDarkLayerContent = (title: string, stars: number, reviews: number, price: number): Object => (
  <DarkLayer>
    <FlagPriceWrapper>
      <FlagPrice
        price={price}
      />
    </FlagPriceWrapper>
    {renderTextContent(title, stars, reviews)}
  </DarkLayer>
);

const renderImage = (imageURL: string): Object => (
  <DisheImageWrapper>
    <DisheImage
      imageURL={imageURL}
    />
  </DisheImageWrapper>
);

const RecommendedSeeAllItemList = ({
  navigation,
  imageURL,
  reviews,
  price,
  title,
  stars,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => onPressItem(navigation, imageURL, id)}
  >
    <Container>
      {renderImage(imageURL)}
      {renderDarkLayerContent(title, stars, reviews, price)}
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(RecommendedSeeAllItemList);
