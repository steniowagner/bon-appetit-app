// @flow

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MainContent = styled(View)`
  flex-direction: row;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
`;

const RestauranName = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Bold;
`;

const MainContentWrapper = styled(View)``;

const RestaurantIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'silverware-variant',
  size: 16,
})`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}
  width: 16px;
  height: 16px;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'arrow-right',
  size: 18,
})`
  width: 18px;
  height: 18px;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const EstablishmentStatus = styled(Text)`
  color: ${({ theme, status }) => (status === 'open' ? theme.colors.green : theme.colors.red)};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Medium;
`;

const SeeRestaurantButtonShape = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.yellow};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('5%')}px;
  border-radius: ${({ theme }) => theme.metrics.getHeightFromDP('5%') / 2}px;
`;

const SeeRestaurantButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '2%' : '2.5%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Black;
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const getStatusText = (distance: string, status: string): string => {
  const statusText = (status === 'open' ? 'Open' : 'Closed');

  return `${statusText} now. ${distance}km from you`;
};

const renderMainContet = (restaurantName: string, status: string, distance: number): Object => (
  <MainContent>
    <RestaurantIcon />
    <MainContentWrapper>
      <RestauranName>
        {restaurantName}
      </RestauranName>
      <EstablishmentStatus status={status}>
        {getStatusText(distance, status)}
      </EstablishmentStatus>
    </MainContentWrapper>
  </MainContent>
);

const renderSeeRestaurantButton = () => (
  <SeeRestaurantButtonShape>
    <ContentWrapper>
      <SeeRestaurantButtonText>
        See Restaurant
      </SeeRestaurantButtonText>
      <ArrowIcon />
    </ContentWrapper>
  </SeeRestaurantButtonShape>
);

type Props = {
  restaurantName: string,
  status: ?string,
  distance: ?number,
};

const RestaurantInfo = ({
  restaurantName,
  status,
  distance,
}: Props) => (
  <Wrapper>
    {renderMainContet(restaurantName, status, distance)}
    {renderSeeRestaurantButton()}
  </Wrapper>
);

export default RestaurantInfo;
