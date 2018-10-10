import React from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyles from 'styles';

const getTextSize = (type: string): number => {
  const types = {
    restaurantsParticipating: Platform.OS === 'android' ? '5.2%' : '4.2%',
    city: Platform.OS === 'android' ? '6.5%' : '5.5%',
    currentCity: Platform.OS === 'android' ? '4.5%' : '4%',
    buttonText: Platform.OS === 'android' ? '5.5%' : '5%',
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Content = styled(View)`
  width: 92%;
  height: 100%;
  justify-content: center;
`;

const CurrentLocationText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${() => getTextSize('currentCity')}px;
  font-family: CircularStd-Medium;
`;

const CityText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${() => getTextSize('city')}px;
  font-family: CircularStd-Black;
`;

const CityAndChangeButtonRow = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const ChangeButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const ChangeButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${() => getTextSize('buttonText')}px;
  font-family: CircularStd-Bold;
`;

const LocationIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.subText,
  name: 'map-marker-multiple',
  size: 20,
})`
  margin-left: -4px;
  width: 20px;
  height: 20px;
`;

const LocationIconWrapper = styled(View)`
  width: 8%;
  height: 100%;
  justify-content: center;
`;

const HeaderCurrentCity = (): Object => (
  <Container>
    <LocationIconWrapper>
      <LocationIcon />
    </LocationIconWrapper>
    <Content>
      <CurrentLocationText>
        Your location
      </CurrentLocationText>
      <CityAndChangeButtonRow>
        <CityText>
          Fortaleza
        </CityText>
        <ChangeButton>
          <ChangeButtonText>
            Change
          </ChangeButtonText>
        </ChangeButton>
      </CityAndChangeButtonRow>
    </Content>
  </Container>
);

export default HeaderCurrentCity;
