// @flow

import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Platform,
  Image,
  View,
  Text,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';
import appStyles from 'styles';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from '../routes';

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

const RestaurantImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const TopRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const BottomRowContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: 70%;
  color: ${({ theme }) => theme.colors.darkText}
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')}px;
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
    const percentage = (Platform.OS === 'ios' ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  fontFamily: CircularStd-Medium;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantStatus = styled(Text)`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  font-family: CircularStd-Medium;
`;

const Icon = styled(Icons).attrs({
  color: ({ theme, color }) => theme.colors[color],
  name: ({ name }) => name,
  size: ({ size }) => size,
})`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

type Props = {
  navigation: Function,
  imageURL: string,
  name: string,
  distance: number,
  stars: number,
  isOpen: boolean,
};

const onPressArrowButton = (props: Object): void => {
  const { navigation } = props;

  const payload = {
    ...props,
  };

  delete payload.navigation;

  navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, { payload });
};

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

  const status = (isOpen ? 'open' : 'closed');

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
      color="green"
      name="directions"
      size={22}
    />
    <DistanceText>
      {`${distance} km`}
    </DistanceText>
  </DistanceWrapper>
);

const renderTopRowContent = (name: string, stars: number, distance: number): Object => (
  <Fragment>
    <TopRowContentWrapper>
      <RestaurantName>
        {name}
      </RestaurantName>
      {renderDistanceContent(distance)}
    </TopRowContentWrapper>
    <ReviewStars
      textColor="darkText"
      stars={stars}
    />
  </Fragment>
);

const renderBottomRowContent = (props: Object): Object => (
  <BottomRowContentWrapper>
    {renderRestaurantStatus()}
    <TouchableOpacity
      onPress={() => onPressArrowButton(props)}
    >
      <Icon
        color="#1F1F21"
        name="arrow-right"
        size={28}
      />
    </TouchableOpacity>
  </BottomRowContentWrapper>
);

const RestaurantItemList = (props: Props): Object => {
  const {
    imageURL,
    distance,
    stars,
    name,
  } = props;

  return (
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
          {renderBottomRowContent(props)}
        </Fragment>
      </Card>
    </Container>
  );
};

export default withNavigation(RestaurantItemList);
