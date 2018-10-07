// @flow

import React, { Fragment } from 'react';
import { Platform, Text, View } from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyles from 'styles';

const getFontSize = (type: string): number => {
  const types = {
    sectionTitle: (Platform.OS === 'android' ? '5.5%' : '4.2%'),
    defaultText: (Platform.OS === 'android' ? '4.5%' : '4%'),
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const DefaultText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('defaultText')};
  fontFamily: CircularStd-Book;
`;

const AddressText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('defaultText')};
  fontFamily: CircularStd-Book;
`;

const SectionRow = styled(View)`
  width: 80%;
  flex-direction: row;
  align-content: center;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Icon = styled(Icons).attrs({
  color: ({ theme }) => theme.colors.gray,
  name: ({ name }) => name,
  size: 20,
})`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
  align-self: center;
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
  <Fragment>
    <SectionRow>
      <Icon
        name="map-marker"
      />
      <AddressText>
        {address}
      </AddressText>
    </SectionRow>
    <SectionRow>
      <Icon
        name="clock"
      />
      <DefaultText>
        {getRestaurantStatus(isOpen, operatingHours)}
      </DefaultText>
    </SectionRow>
    <DefaultText>
      {about}
    </DefaultText>
  </Fragment>
);

export default AboutRestaurantSection;
