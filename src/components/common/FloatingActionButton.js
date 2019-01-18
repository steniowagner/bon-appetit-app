// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const ButtonShape = styled(View)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(Icon).attrs(({ name }) => ({
  size: 25,
  name,
}))`
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

type Props = {
  action: Function,
  color: string,
  name: string,
};

const FloatingActionButton = ({ action, color, name }: Props) => (
  <TouchableOpacity
    onPress={() => action()}
  >
    <ButtonShape
      color={color}
    >
      <ButtonIcon
        name={name}
      />
    </ButtonShape>
  </TouchableOpacity>
);

export default FloatingActionButton;
