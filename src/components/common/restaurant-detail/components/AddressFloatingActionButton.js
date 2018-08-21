import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const ButtonShape = styled(View)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.yellow};
  justify-content: center;
  align-items: center;
`;

const MapMarkerIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker-multiple',
  size: 25,
})`
  width: 25px;
  height: 25px;
`;

const AddressFloatingActionButton = () => (
  <ButtonShape>
    <TouchableWithoutFeedback>
      <MapMarkerIcon />
    </TouchableWithoutFeedback>
  </ButtonShape>
);

export default AddressFloatingActionButton;
