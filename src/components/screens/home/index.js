import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import NavigationHeader from 'components/common/NavigationHeader';

class Home extends Component {
  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#FDFDFD'}}>
        <NavigationHeader isHome title="Bon Appetit" />
        <Text>
          Home
        </Text>
      </View>
    );
  }
}

export default Home;
