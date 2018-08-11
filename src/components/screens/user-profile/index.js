import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const Icon = styled(Image).attrs({
  source: ({ theme }) => theme.images.user_profile,
})`
  tint-color: ${({ tintColor }) => tintColor};
  margin: 2px 8px 0 0;
  width: 18;
  height: 18;
`;

const Profile = () => (
  <View>
    <Text>
      User Profile
    </Text>
  </View>
);

Profile.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon tintColor={tintColor} />
  ),
};


export default Profile;
