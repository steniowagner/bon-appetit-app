import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const Icon = styled(Image).attrs({
  source: ({ theme }) => theme.images.settings,
})`
  tint-color: ${({ tintColor }) => tintColor};
  margin: 2px 8px 0 0;
  width: 18;
  height: 18;
`;

const Settings = () => (
  <View>
    <Text>
      Settings
    </Text>
  </View>
);

Settings.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon tintColor={tintColor} />
  ),
};

export default Settings;
