// @flow

import React, { Fragment } from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import ReviewStars from '~/components/common/ReviewStars';

const Container = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.mediumSize}px
    ${({ theme }) => theme.metrics.largeSize}px
    ${({ theme }) => theme.metrics.smallSize}px
    ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DescriptionText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 4,
})`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')};
  font-family: CircularStd-Book;
`;

const DefaultText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Book;
`;

const SectionRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const RestaurantName = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  width: 75%;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')};
  font-family: CircularStd-Bold;
`;

const CustomIcon = styled(Icon).attrs(({ name }) => ({
  size: 18,
  name,
}))`
  margin-left: -4px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

const getOperatingHoursText = (
  operatingHours: Object,
  isOpen: boolean,
): string => {
  const { open, close } = operatingHours;

  const operatingHoursText = isOpen
    ? `Open now - Closes ${close}`
    : `Closed now - Opens ${open}`;

  return operatingHoursText;
};

const renderAddressAndOperatingHours = (
  operatingHours: Object,
  address: string,
  isOpen: boolean,
): Object => (
  <Fragment>
    <SectionRow>
      <CustomIcon
        name="map-marker-outline"
      />
      <DefaultText>{address}</DefaultText>
    </SectionRow>
    <SectionRow>
      <CustomIcon
        name="clock-outline"
      />
      <DefaultText>{getOperatingHoursText(operatingHours, isOpen)}</DefaultText>
    </SectionRow>
  </Fragment>
);

type Props = {
  operatingHours: Object,
  description: string,
  isOpen: boolean,
  address: string,
  stars: number,
  name: string,
};

const AboutRestaurant = ({
  operatingHours,
  description,
  address,
  isOpen,
  stars,
  name,
}: Props) => (
  <Container>
    <RestaurantName>{name}</RestaurantName>
    <ReviewStars
      stars={stars}
    />
    {renderAddressAndOperatingHours(operatingHours, address, isOpen)}
    <DescriptionText>{description}</DescriptionText>
  </Container>
);

export default AboutRestaurant;
