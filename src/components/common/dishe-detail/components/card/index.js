// @flow

import React from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components';

import Header from './Header';
import Tabs from './Tabs';

const Container = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DishDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.2%')}px;
  font-family: CircularStd-Book;
`;

type Props = {
  dishDetail: Object,
};

const Card = ({ dishDetail }: Props): Object => {
  const { reviews, dish } = dishDetail;

  return (
    <Container>
      <Header
        price={dish.price.toFixed(2)}
        reviews={dish.reviews}
        stars={dish.stars}
        title={dish.title}
      />
      <DishDescription>{dish.description}</DishDescription>
      <Tabs
        ingredients={dish.ingredients}
        reviews={reviews}
      />
    </Container>
  );
};

export default Card;
