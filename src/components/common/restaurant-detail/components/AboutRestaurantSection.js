// @flow

import React from 'react';
import { Platform, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const EstablishmentInfoWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const EstablishmentInfoText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('65%')};
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.6%' : '2.3%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  fontFamily: CircularStd-Book;
`;

const RestaurantAboutText = styled(Text)`
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.7%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  fontFamily: CircularStd-Medium;
`;

const InfoIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: ({ iconTitle }) => iconTitle,
  size: 18,
})`
  width: 18px;
  height: 18px;
`;

type Props = {
  address: string,
  about: string,
  operatingHours: Object,
  isOpen: boolean,
};

const getRestaurantStatus = (isOpen: boolean, operatingHours: Object): string => {
  const { open, close } = operatingHours;

  const restaurantStatus = (isOpen ? `Open now (until ${close})` : `Closed now (open ${open})`);

  return restaurantStatus;
};

const AboutRestaurantSection = ({
  operatingHours,
  address,
  isOpen,
  about,
}: Props) => (
  <React.Fragment>
    <EstablishmentInfoWrapper>
      <InfoIcon
        iconTitle="map-marker-outline"
      />
      <EstablishmentInfoText>
        {address}
      </EstablishmentInfoText>
    </EstablishmentInfoWrapper>
    <EstablishmentInfoWrapper>
      <InfoIcon
        iconTitle="clock-outline"
      />
      <EstablishmentInfoText>
        {getRestaurantStatus(isOpen, operatingHours)}
      </EstablishmentInfoText>
    </EstablishmentInfoWrapper>
    <RestaurantAboutText>
      {about}
    </RestaurantAboutText>
  </React.Fragment>
);

export default AboutRestaurantSection;
