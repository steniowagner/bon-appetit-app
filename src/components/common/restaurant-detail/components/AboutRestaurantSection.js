// @flow

import React from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const EstablishmentInfoContainer = styled(ShimmerPlaceholder)`
  width: 80%;
`;

const EstablishmentInfoWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const EstablishmentInfoText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  fontFamily: CircularStd-Book;
`;

const RestaurantAboutText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Medium;
`;

const InfoIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: ({ iconTitle }) => iconTitle,
  size: 16,
})`
  width: 16px;
  height: 16px;
`;

type Props = {
  address: string,
  status: string,
  about: string,
  isDataFetched: boolean,
};

const AboutRestaurantSection = ({
  address,
  status,
  about,
  isDataFetched,
}: Props) => (
  <React.Fragment>
    <EstablishmentInfoContainer
      autoRun
      visible={isDataFetched}
    >
      <EstablishmentInfoWrapper>
        <InfoIcon iconTitle="map-marker-outline" />
        <EstablishmentInfoText>
          {address}
        </EstablishmentInfoText>
      </EstablishmentInfoWrapper>
      <EstablishmentInfoWrapper>
        <InfoIcon iconTitle="clock-outline" />
        <EstablishmentInfoText>
          {status}
        </EstablishmentInfoText>
      </EstablishmentInfoWrapper>
    </EstablishmentInfoContainer>
    <ShimmerPlaceholder
      autoRun
      visible={isDataFetched}
      style={{ marginTop: 20 }}
    >
      <RestaurantAboutText>
        {about}
      </RestaurantAboutText>
    </ShimmerPlaceholder>
  </React.Fragment>
);

export default AboutRestaurantSection;
