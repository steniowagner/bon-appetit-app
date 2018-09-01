// @flow

import React, { Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import ReviewStars from 'components/common/ReviewStars';
import ImageCached from './components/ImageCached';

const CardContainer = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ContainerShimmer = styled(ShimmerPlaceholder)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
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

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const AddressWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}
  flex-direction: row;
  width: 70%;
`;

const AddressIconWrapper = styled(View)`
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px ${theme.metrics.smallSize}px 0 0`}
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  fontFamily: CircularStd-Medium;
`;

const AddressIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 20,
})``;

const renderBottomRow = (address: string) => (
  <React.Fragment>
    <AddressWrapper>
      <AddressIconWrapper>
        <AddressIcon />
      </AddressIconWrapper>
      <Address>
        {address}
      </Address>
    </AddressWrapper>
  </React.Fragment>
);

type Props = {
  name: string,
  address: string,
  picURL: string,
  stars: number,
  navigation: Function,
};

const RestaurantItemList = ({
  name,
  address,
  stars,
  picURL,
  navigation,
}: Props) => {
  const onItemPress = () => {
    navigation.navigate(ROUTE_NAMES.RESTAURANT_DETAIL, {
      payload: {
        name,
        address,
        stars,
        picURL,
      },
    });
  };

  return (
    <CardContainer>
      <TouchableOpacity onPress={() => onItemPress()}>
        <Fragment>
          <ImageCached uri={picURL} />
          <DarkLayer />
          <Content>
            <Name>
              {name}
            </Name>
            <ReviewStars
              stars={stars}
              shouldShowReviewsText
              reviews={1}
              textColor="white"
            />
            {renderBottomRow(address)}
          </Content>
        </Fragment>
      </TouchableOpacity>
      {false && <ContainerShimmer autoRun visible={false}/>}
    </CardContainer>
  );
};

export default withNavigation(RestaurantItemList);
