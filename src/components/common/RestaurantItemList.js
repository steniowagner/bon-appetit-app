// @flow

import React, { Fragment } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const CardContainer = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ContentWrapper = styled(View)`
  width: 100%;
`;

const DarkLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  height: 100%;
  width: 100%;
`;

const Content = styled(View)`
  padding: ${({ theme }) => `${theme.metrics.extraLargeSize}px ${theme.metrics.largeSize}px ${theme.metrics.largeSize}px ${theme.metrics.largeSize}px`};
`;

const RestaurantImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const RestaurantImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const AddressWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}
`;


const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')}px;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  fontFamily: CircularStd-Medium;
`;

const AddressIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 20,
})`
  width: 20px;
  height: 20px;
`;

const onItemPress = (props: Object): void => {
  const { navigation } = props;

  const payload = {
    ...props,
  };

  delete payload.navigation;

  navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, { payload });
};

const renderRestaurantImage = ({ imageURL }: string): Object => (
  <RestaurantImageWrapper>
    <RestaurantImage
      imageURL={imageURL}
    />
  </RestaurantImageWrapper>
);

const renderBottomRow = (address: string): Object => (
  <Fragment>
    <AddressWrapper>
      <AddressIcon />
      <Address>
        {address}
      </Address>
    </AddressWrapper>
  </Fragment>
);

const renderRestaurantInfo = (props: Object): Object => {
  const { name, stars, address } = props;

  return (
    <Content>
      <Name>
        {name}
      </Name>
      <ReviewStars
        textColor="white"
        stars={stars}
      />
      {renderBottomRow(address)}
    </Content>
  );
};

const RestaurantItemList = (props): Object => (
  <CardContainer>
    <TouchableWithoutFeedback
      onPress={() => onItemPress(props)}
    >
      <ContentWrapper>
        {renderRestaurantImage(props)}
        <DarkLayer />
        {renderRestaurantInfo(props)}
      </ContentWrapper>
    </TouchableWithoutFeedback>
  </CardContainer>
);

export default withNavigation(RestaurantItemList);
