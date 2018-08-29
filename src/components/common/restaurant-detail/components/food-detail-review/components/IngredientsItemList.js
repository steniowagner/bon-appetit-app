// @flow

import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components';

const IngredientsText = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')};
  font-family: CircularStd-Book;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  padding-top:  ${({ theme, index }) => (index === 0 ? theme.metrics.mediumSize : 0)}px;
`;

type Props = {
  ingredient: string,
  index: number,
};

const IngredientsItemList = ({ ingredient, index }: Props) => (
  <IngredientsText
    index={index}
  >
    {ingredient}
  </IngredientsText>
);

export default IngredientsItemList;
