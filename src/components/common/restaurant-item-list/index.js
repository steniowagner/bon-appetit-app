import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import StarGrade from 'components/common/StarGrade';
import FoodTypes from './components/FoodTypes';

const CardContainer = styled(View)`
  height: ${({ theme }) => theme.metrics.height / 3};
  width: ${({ theme }) => theme.metrics.width - 16};
  border-radius: 10px;
`;

const DarkLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

const Content = styled(View)`
  padding:  ${({ theme }) => {
    const { extraLargePadding, largePadding } = theme.metrics;

    return `${extraLargePadding}px 0 ${largePadding}px ${largePadding}px`;
  }}
`;

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.smallPadding}
  font-weight: 900;
  font-size: 16px;
`;

const AddressWrapper = styled(View)`
  flex-direction: row;
   margin: ${({ theme }) => `${theme.metrics.mediumPadding}px 0 ${theme.metrics.mediumPadding}px 0`}
`;

const AddressIcon = styled(Image).attrs({
  source: ({ theme }) => theme.images.mapMarker,
})`
  tint-color: ${({ theme }) => theme.colors.defaultWhite};
  margin: 2px 8px 0 0;
  width: 18;
  height: 18;
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: 12px;
`;

const getRestaurantAddress = (rawAddress) => {
  const lastCommaIndex = rawAddress.lastIndexOf(',');

  return `${rawAddress.substring(0, lastCommaIndex + 1)}\n${rawAddress.substring(lastCommaIndex + 2, rawAddress.length)}`;
};

const RestaurantItemList = () => (
  <TouchableOpacity>
    <CardContainer>
      <DarkLayer />
      <Content>
        <Name>
          Cabaña del Primo
        </Name>
        <StarGrade
          grade={3.5}
          shouldShowReviewsText
          reviews={1}
          color="light"
        />
        <AddressWrapper>
          <AddressIcon />
          <Address>
            {getRestaurantAddress('Maria Tomásia st., 503 - Aldeota, Fortaleza')}
          </Address>
        </AddressWrapper>
        <FoodTypes types={['Churrascaria', 'Sobremesas', 'Massas', 'Frutos do Mar', 'Pastelaria', 'Pizzas']} />
      </Content>
    </CardContainer>
  </TouchableOpacity>
);

export default RestaurantItemList;
