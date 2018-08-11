import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const Icon = styled(Image).attrs({
  source: ({ theme }) => theme.images.home,
})`
  tint-color: ${({ tintColor }) => tintColor};
  margin: 2px 8px 0 0;
  width: 18;
  height: 18;
`;

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon tintColor={tintColor} />
    ),
  };

  render() {
    console.log(this.props);
    return (
      <View style={{flex: 1,backgroundColor: '#FDFDFD'}}>
        <Text>
          Home
        </Text>
      </View>
    );
  }
}

export default Home;
