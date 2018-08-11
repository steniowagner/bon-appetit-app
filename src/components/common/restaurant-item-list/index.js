// @flow

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyle from 'styles';

import ReviewStars from 'components/common/ReviewStars';
import ImageCached from './components/ImageCached';
import FoodTypes from './components/FoodTypes';

const CardContainer = styled(View)`
  margin: ${({ theme }) => {
    const { smallPadding, extraSmallPadding } = theme.metrics;

    return `${extraSmallPadding}px ${smallPadding}px ${extraSmallPadding}px ${smallPadding}px`;
  }};
  border-radius: 10px;
`;

const DarkLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

const Content = styled(View)`
  padding:  ${({ theme }) => {
    const { extraLargePadding, largePadding } = theme.metrics;

    return `${extraLargePadding}px 0 ${largePadding}px ${largePadding}px`;
  }}
`;

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallPadding}
  fontFamily: CircularStd-Black;
  font-size: 18px;
`;

const AddressWrapper = styled(View)`
  flex-direction: row;
   margin: ${({ theme }) => `${theme.metrics.mediumPadding}px 0 ${theme.metrics.mediumPadding}px 0`}
`;

const AddressIconWrapper = styled(View)`
  margin: 2px 8px 0 0;
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  fontFamily: CircularStd-Medium;
  font-size: 14px;
`;

const getRestaurantAddress = (rawAddress) => {
  const lastCommaIndex = rawAddress.lastIndexOf(',');

  return `${rawAddress.substring(0, lastCommaIndex + 1)}\n${rawAddress.substring(lastCommaIndex + 2, rawAddress.length)}`;
};

type Props = {
  foodTypes: Array<string>,
  name: string,
  address: string,
  picURL: string,
  stars: number,
};

const RestaurantItemList = ({
  name,
  address,
  stars,
  foodTypes,
  picURL,
}: Props) => (
  <TouchableOpacity>
    <CardContainer>
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
        <AddressWrapper>
          <AddressIconWrapper>
            <Icon
              color={appStyle.colors.defaultWhite}
              name="map-marker"
              size={20}
            />
          </AddressIconWrapper>
          <Address>
            {getRestaurantAddress(address)}
          </Address>
        </AddressWrapper>
        <FoodTypes types={foodTypes} />
      </Content>
    </CardContainer>
  </TouchableOpacity>
);

export default RestaurantItemList;
