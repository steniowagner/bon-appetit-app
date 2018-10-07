// @flow

import React from 'react';
import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const RestaurantImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const RestaurantName = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')};
  fontFamily: CircularStd-Bold;
`;

type Props = {
  restaurantImage: string,
  restaurantName: string,
  stars: number,
};

const HeaderSection = ({
  restaurantImage,
  restaurantName,
  stars,
}: Props): Object => (
  <Container>
    <RestaurantImage
      imageURL={restaurantImage}
    />
    <DarkLayer />
    <ContentWrapper>
      <RestaurantName>
        {restaurantName}
      </RestaurantName>
      <ReviewStars
        shouldShowReviewsText={false}
        textColor="defaultWhite"
        stars={stars}
      />
    </ContentWrapper>
  </Container>
);

export default HeaderSection;
