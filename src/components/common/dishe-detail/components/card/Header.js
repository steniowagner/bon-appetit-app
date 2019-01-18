// @flow

import React from 'react';
import { Platform, Text, View } from 'react-native';
import styled from 'styled-components';

import ReviewStars from '~/components/common/ReviewStars';
import FlagPrice from '~/components/common/FlagPrice';

const ContentWrapper = styled(View)`
  width: 100%;
`;

const TitleAndPriceWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PriceWrapper = styled(View)`
  height: 100%;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize / 1.5}px;
`;

const DishTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  width: 80%;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '6.5%' : '6%';
    return theme.metrics.getWidthFromDP(percentage);
  }};
  font-family: CircularStd-Black;
`;

type Props = {
  reviews: number,
  price: number,
  stars: number,
  title: string,
};

const DishInfo = ({
  reviews, price, stars, title,
}: Props) => (
  <ContentWrapper>
    <TitleAndPriceWrapper>
      <DishTitle>{title}</DishTitle>
      <PriceWrapper>
        <FlagPrice
          price={price}
        />
      </PriceWrapper>
    </TitleAndPriceWrapper>
    <ReviewStars
      shouldShowReviewsText
      textColor="darkText"
      reviews={reviews}
      stars={stars}
    />
  </ContentWrapper>
);

export default DishInfo;
