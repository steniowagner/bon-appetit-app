// @flow

import React, { Fragment } from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from '~/components/common/ReviewStars';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.width - theme.metrics.getWidthFromDP('24%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
`;

const Card = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  border-radius: 4px;
`;

const RestaurantImageWrapper = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('12.5%')}px;
  border-radius: 4px;
  overflow: hidden;
`;

const RestaurantImage = styled(FastImage).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
}))`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const TopRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const BottomRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantName = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  width: 70%;
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const DistanceWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '1.8%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Medium;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantStatus = styled(Text)`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '1.8%' : '2%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  font-family: CircularStd-Medium;
`;

const Icon = styled(Icons).attrs(({
  color, theme, name, size,
}) => ({
  color: theme.colors[color],
  name,
  size,
}))``;

const renderRestaurantImage = (imageURL: string): Object => (
  <RestaurantImageWrapper>
    <RestaurantImage
      imageURL={imageURL}
    />
  </RestaurantImageWrapper>
);

const renderRestaurantStatus = (isOpen: boolean): Object => {
  const restaurantStatus = {
    open: {
      color: appStyles.colors.green,
      text: 'Open now',
    },
    closed: {
      color: appStyles.colors.red,
      text: 'Closed now',
    },
  };

  const status = isOpen ? 'open' : 'closed';

  return (
    <RestaurantStatus
      color={restaurantStatus[status].color}
    >
      {restaurantStatus[status].text}
    </RestaurantStatus>
  );
};

const renderDistanceContent = (distance: number): Object => (
  <DistanceWrapper>
    <Icon
      color={appStyles.colors.primaryColor}
      name="directions"
      size={22}
    />
    <DistanceText>{`${distance} km`}</DistanceText>
  </DistanceWrapper>
);

const renderTopRowContent = (
  name: string,
  stars: number,
  distance: number,
): Object => (
  <Fragment>
    <TopRowContentWrapper>
      <RestaurantName>{name}</RestaurantName>
      {renderDistanceContent(distance)}
    </TopRowContentWrapper>
    <ReviewStars
      textColor="darkText"
      stars={stars}
    />
  </Fragment>
);

const renderBottomRowContent = (
  navigation: Function,
  isOpen: boolean,
  id: string,
): Object => (
  <BottomRowContentWrapper>
    {renderRestaurantStatus(isOpen)}
    <TouchableOpacity
      onPress={() => navigation.navigate(CONSTANTS.ROUTE_RESTAURANT_DETAIL, {
        [CONSTANTS.NAVIGATION_PARAM_ID]: id,
      })
      }
    >
      <Icon
        color={appStyles.colors.darkText}
        name="arrow-right"
        size={28}
      />
    </TouchableOpacity>
  </BottomRowContentWrapper>
);

type Props = {
  navigation: Function,
  imageURL: string,
  distance: number,
  isOpen: boolean,
  stars: number,
  name: string,
  id: string,
};

const RestaurantItemList = ({
  navigation,
  distance,
  imageURL,
  isOpen,
  stars,
  name,
  id,
}: Props): Object => (
  <Container>
    <Card
      style={{
        ...Platform.select({
          ios: {
            elevation: 1,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 3,
            shadowOpacity: 0.35,
          },
          android: {
            elevation: 4,
            shadowOffset: {
              width: 1,
              height: -3,
            },
            shadowRadius: 2,
            shadowOpacity: 5.0,
          },
        }),
      }}
    >
      <Fragment>
        {renderRestaurantImage(imageURL)}
        {renderTopRowContent(name, stars, distance)}
        {renderBottomRowContent(navigation, isOpen, id)}
      </Fragment>
    </Card>
  </Container>
);

export default withNavigation(RestaurantItemList);
