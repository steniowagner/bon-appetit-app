// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import { ROUTE_NAMES } from '~/routes';
import { ContentContainer } from './Common';

type Props = {
  navigation: Object,
  children: Object,
  color: string,
};

const ButtonContent = ({ navigation, children, color }: Props): Object => (
  <TouchableOpacity
    onPress={() => navigation.navigate(ROUTE_NAMES.MAIN_STACK)}
  >
    <ContentContainer
      color={color}
    >
      {children}
    </ContentContainer>
  </TouchableOpacity>
);

export default withNavigation(ButtonContent);
