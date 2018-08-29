// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

const RestaurantInfoWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  justify-content: space-between;
`;

const RestaurantTextInfoWrapper = styled(View)`
  width: 80%;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
`;

const RestaurantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.4%')};
  padding-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')}px;
  font-family: CircularStd-Medium;
`;

const RestaurantStatus = styled(Text)`
  width: 100%;
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2%')};
  font-family: CircularStd-Medium;
`;

const RestaurantIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'silverware',
  size: 18,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  width: 18px;
  height: 18px;
`;

const VisitRestaurantWrapper = styled(View)`
  width: 20%;
  align-items: flex-end;
  justify-content: center;
`;

const VisitRestaurantShape = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('0.8%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const VisitText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2%')};
  font-family: CircularStd-Black;
  margin-right: -${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'chevron-right',
  size: 18,
})`
  margin-right: -8px;
  width: 18px;
  height: 18px;
`;

const RestaurantInfoShimmer = styled(ShimmerPlaceholder).attrs({
  visible: false,
  autoRun: true,
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const onPressVisitRestaurantButton = (navigation: Function): void => {
  navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, {});
};

const renderTextContent = (distance: number, isOpen: boolean, restaurantName: string): Object => {
  const restaurantStatus = {
    open: {
      color: appStyles.colors.green,
      text: `Open now, ${distance}km from you`,
    },
    closed: {
      color: appStyles.colors.red,
      text: 'Closed now',
    },
  };

  const status = (isOpen ? 'open' : 'closed');

  return (
    <View style={{ paddingLeft: 4 }}>
      <RestaurantName>
        {restaurantName}
      </RestaurantName>
      <RestaurantStatus
        color={restaurantStatus[status].color}
      >
        {restaurantStatus[status].text}
      </RestaurantStatus>
    </View>
  );
};

const renderRestaurantVisitButton = (navigation: Function): void => (
  <VisitRestaurantWrapper>
    <VisitRestaurantShape
      onPress={() => onPressVisitRestaurantButton(navigation)}
    >
      <VisitText>
        Visit
      </VisitText>
      <ArrowIcon />
    </VisitRestaurantShape>
  </VisitRestaurantWrapper>
);

type Props = {
  isDataFetched: boolean,
  isOpen: boolean,
  restaurantName: string,
  distance: number,
  navigation: Function,
};

const RestaurantInfo = ({
  isOpen,
  restaurantName,
  distance,
  isDataFetched,
  navigation,
}: Props) => {
  const RestaurantInfoComponents = (
    <RestaurantInfoWrapper>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <RestaurantTextInfoWrapper>
          <RestaurantIcon />
          {renderTextContent(distance, isOpen, restaurantName)}
        </RestaurantTextInfoWrapper>
        {renderRestaurantVisitButton(navigation)}
      </View>
    </RestaurantInfoWrapper>
  );

  const ProperComponent = (isDataFetched ? RestaurantInfoComponents : <RestaurantInfoShimmer />);

  return ProperComponent;
};

export default withNavigation(RestaurantInfo);
