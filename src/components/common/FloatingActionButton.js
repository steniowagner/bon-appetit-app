// @flow

import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

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

const ButtonIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: ({ name }) => name,
  size: 25,
})`
  width: 25px;
  height: 25px;
`;

type Props = {
  name: string,
  color: string,
  action: Function,
};

const FloatingActionButton = ({
  name,
  color,
  action,
}: Props) => (
  <TouchableWithoutFeedback
    onPress={() => action()}
  >
    <ButtonShape
      color={color}
    >
      <ButtonIcon
        name={name}
      />
    </ButtonShape>
  </TouchableWithoutFeedback>
);

export default FloatingActionButton;
