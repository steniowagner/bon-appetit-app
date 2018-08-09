// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ItemWrapper = styled(View)`
  border-color: ${({ theme }) => theme.colors.defaultWhite};
  margin-right: ${({ theme }) => theme.metrics.smallPadding};
  margin: ${({ theme }) => `0 ${theme.metrics.smallPadding}px ${theme.metrics.smallPadding}px 0`};
  border-radius: 25px;
  border-width: 1px;
`;

const ItemText = styled(Text)`
  padding: ${({ theme }) => `${theme.metrics.extraSmallPadding}px ${theme.metrics.mediumPadding}px`};
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: 12px;
  font-weight: 900;
`;

const sortFoodTypesByLegth = (foodTypes) => {
  const foodTypesLengthComparator = (foodtypeA, foodtypeB) => foodtypeA.length > foodtypeB.length;
  const foodTypesSortedByLength = foodTypes.sort(foodTypesLengthComparator);

  return foodTypesSortedByLength;
};

const renderItems = foodTypes => (
  foodTypes.map(foodType => (
    <ItemWrapper key={foodType}>
      <ItemText>
        {foodType}
      </ItemText>
    </ItemWrapper>
  ))
);

type Props = {
  types: Array<string>,
};

const FoodType = ({ types }: Props) => {
  const MAX_FOODTYPES_TO_SHOW = 5;

  const remainingFoodTypes = types.length - MAX_FOODTYPES_TO_SHOW;
  const shouldShowRemainingFoodTypes = remainingFoodTypes > 0;

  const foodTypesSortedByLength = sortFoodTypesByLegth(types);
  const foodTypesToShow = foodTypesSortedByLength.slice(0, MAX_FOODTYPES_TO_SHOW);

  return (
    <Wrapper>
      {renderItems(foodTypesToShow)}
      {shouldShowRemainingFoodTypes
        && (
        <ItemWrapper>
          <ItemText>
            {`+${remainingFoodTypes}`}
          </ItemText>
        </ItemWrapper>
        )}
    </Wrapper>
  );
};

export default FoodType;
