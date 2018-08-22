// @flow

import React from 'react';
import { Text, View, Image } from 'react-native';

import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
`;

const RestaurantImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  justify-content: flex-end;
`;

const RestaurantName = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.4%')}px;
  fontFamily: CircularStd-Bold;
`;

type Props = {
  restaurantImage: string,
  restaurantName: string,
  reviews: number,
  stars: number,
};

const HeaderSection = ({
  restaurantImage,
  restaurantName,
  reviews,
  stars,
}: Props) => (
  <Container>
    <RestaurantImage imageURL={restaurantImage} />
    <DarkLayer />
    <ContentWrapper>
      <RestaurantName>
        {restaurantName}
      </RestaurantName>
      <ReviewStars
        shouldShowReviewsText
        textColor="defaultWhite"
        reviews={reviews}
        stars={stars}
      />
    </ContentWrapper>
  </Container>
);

export default HeaderSection;
