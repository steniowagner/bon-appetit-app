import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Wrapper = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const EstablishmentInfoContainer = styled(View)`
  width: 80%;
`;

const EstablishmentInfoWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const EstablishmentInfoText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  fontFamily: CircularStd-Book;
`;

const RestaurantAboutText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.7%')}px;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
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

const AboutRestaurantSection = () => (
  <Wrapper>
    <EstablishmentInfoContainer>
      <EstablishmentInfoWrapper>
        <InfoIcon iconTitle="map-marker-outline" />
        <EstablishmentInfoText>
          R. Maria Tomásia, 503 - Aldeota, Fortaleza
        </EstablishmentInfoText>
      </EstablishmentInfoWrapper>
      <EstablishmentInfoWrapper>
        <InfoIcon iconTitle="clock-outline" />
        <EstablishmentInfoText>
          Aberto agora (até às 23:30)
        </EstablishmentInfoText>
      </EstablishmentInfoWrapper>
    </EstablishmentInfoContainer>
    <RestaurantAboutText>
      Gastronomia requintada de carnes nobres argentinas, ambiente chique e intimista convidativo a longas estadias.
    </RestaurantAboutText>
  </Wrapper>
);

export default AboutRestaurantSection;
