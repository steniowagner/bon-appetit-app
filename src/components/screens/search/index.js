import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const Icon = styled(Image).attrs({
  source: ({ theme }) => theme.images.search,
})`
  tint-color: ${({ tintColor }) => tintColor};
  margin: 2px 8px 0 0;
  width: 18;
  height: 18;
`;

const Search = () => (
  <View>
    <Text>
      Search
    </Text>
  </View>
);

Search.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon tintColor={tintColor} />
  ),
};

export default Search;
