import React from 'react';
import { View, Text } from 'react-native';

import NavigationHeader from 'components/common/NavigationHeader';

const Profile = () => (
  <View>
    <NavigationHeader title="Profile" />
    <Text>
      User Profile
    </Text>
  </View>
);

export default Profile;
