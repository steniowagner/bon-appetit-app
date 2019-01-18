// @flow

import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import CustomTab from '~/components/common/CustomTab';
import appStyles from '~/styles';

import RestaurantsList from './restaurants-list';
import Map from './Map';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const CustomTabWrapper = styled(View)`
  position: absolute;
`;

type Props = {
  dishesTypesItems: Array<Object>,
  indexRestaurantSelected: number,
  onDishesTypeChange: Function,
  restaurants: Array<Object>,
  onSelectMarker: Function,
  userLocation: Object,
};

const NearYou = ({
  indexRestaurantSelected,
  onDishesTypeChange,
  dishesTypesItems,
  onSelectMarker,
  userLocation,
  restaurants,
}: Props): Object => (
  <Container>
    <ContentContainer>
      <Map
        indexLocationSelected={indexRestaurantSelected}
        onSelectMarker={onSelectMarker}
        userLocation={userLocation}
        restaurants={restaurants}
      />
      {restaurants.length > 0 && (
        <RestaurantsList
          indexRestaurantSelected={indexRestaurantSelected}
          onSelectMarker={onSelectMarker}
          restaurants={restaurants}
        />
      )}
    </ContentContainer>
    <CustomTabWrapper>
      <CustomTab
        onChangeMenuIndex={index => onDishesTypeChange(index)}
        contentWidth={appStyles.metrics.width}
        data={dishesTypesItems}
        theme="red"
      />
    </CustomTabWrapper>
  </Container>
);

export default NearYou;
