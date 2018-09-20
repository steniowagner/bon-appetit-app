// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const TopContent = styled(View)`
  width: 100%;
`;

const DishTitle = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('65%')};
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.5%')};
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Black;
`;

type Props = {
  reviews: number,
  stars: number,
  dishTitle: string,
};

const FoodStatus = ({
  dishTitle,
  reviews,
  stars,
}: Props) => (
  <TopContent>
    <DishTitle>
      {dishTitle}
    </DishTitle>
    <ReviewStars
      shouldShowReviewsText
      reviews={reviews}
      textColor="darkText"
      stars={stars}
    />
  </TopContent>
);

export default FoodStatus;
