import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import ReviewStars from 'components/common/ReviewStars';

const TopContent = styled(View)`
  width: 100%;
`;

const FirstRowWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('5%')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: 80%;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.5%')};
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Black;
`;

const FoodStatusShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  price: number,
  reviews: number,
  stars: number,
  foodTitle: string,
  isDataFetched: boolean,
  isReviewMode: boolean,
};

const FoodStatus = ({
  reviews,
  stars,
  foodTitle,
  isDataFetched,
}: Props) => {
  const FoodStatusComponents = (
    <TopContent>
      <FirstRowWrapper>
        <FoodTitle>
          {foodTitle}
        </FoodTitle>
      </FirstRowWrapper>
      <ReviewStars
        shouldShowReviewsText
        reviews={reviews}
        textColor="darkText"
        stars={stars}
      />
    </TopContent>
  );

  const ProperComponent = (isDataFetched ? FoodStatusComponents : <FoodStatusShimmer />);

  return ProperComponent;
};

export default FoodStatus;
