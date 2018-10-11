// @flow

import React, { Fragment } from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyles from 'styles';

import ReviewStars from 'components/common/ReviewStars';

const getFontSize = (type: string): number => {
  const types = {
    description: (Platform.OS === 'android' ? '5%' : '4.5%'),
    defaultText: (Platform.OS === 'android' ? '4.5%' : '4%'),
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const Container = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const SectionWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DescriptionText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 4,
})`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('description')};
  fontFamily: CircularStd-Book;
`;

const DefaultText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('defaultText')};
  fontFamily: CircularStd-Book;
`;

const SectionRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const RestaurantName = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  width: 75%;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')};
  fontFamily: CircularStd-Bold;
`;

const CustomIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: ({ name }) => name,
  size: 18,
})`
  width: 18px;
  height: 18px;
  margin-left: -4px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

type Props = {
  address: string,
  about: string,
  name: string,
  operatingHours: Object,
  isOpen: boolean,
  stars: number,
};

const getOperatingHoursText = (isOpen: boolean, operatingHours: Object): string => {
  const { open, close } = operatingHours;

  const text = (isOpen ? `Open now - Closes ${close}` : `Closed now - Opens ${open}`);

  return text;
};

const renderAddressAndOperatingHours = (address: string, isOpen: boolean, operatingHours: Object): Object => (
  <Fragment>
    <SectionRow>
      <CustomIcon
        name="map-marker-outline"
      />
      <DefaultText>
        {address}
      </DefaultText>
    </SectionRow>
    <SectionRow>
      <CustomIcon
        name="clock-outline"
      />
      <DefaultText>
        {getOperatingHoursText(isOpen, operatingHours)}
      </DefaultText>
    </SectionRow>
  </Fragment>
);

const AboutRestaurantSection = ({
  operatingHours,
  address,
  isOpen,
  about,
  stars,
  name,
}: Props) => (
  <Container>
    <RestaurantName>
      {name}
    </RestaurantName>
    <ReviewStars
      stars={stars}
    />
    <SectionWrapper>
      <DescriptionText>
        {about}
      </DescriptionText>
    </SectionWrapper>
    {renderAddressAndOperatingHours(address, isOpen, operatingHours)}
  </Container>
);

export default AboutRestaurantSection;
