// @flow

import React, { Fragment } from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';

import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';
import ReviewStars from './ReviewStars';

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
  padding: ${({ theme }) => `${theme.metrics.largeSize}px`};
`;

const RestaurantImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const RestaurantImage = styled(FastImage).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  font-family: CircularStd-Black;
`;

const AddressWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}
  padding-right: ${({ theme }) => `${theme.metrics.largeSize}px`};
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Medium;
`;

const AddressIcon = styled(Icon).attrs({
  name: 'map-marker',
  size: 20,
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const renderRestaurantImage = (
  thumbnailImageURL: string,
  imageURL: string,
): Object => (
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
      <Address>{address}</Address>
    </AddressWrapper>
  </Fragment>
);

const renderRestaurantInfo = (
  name: string,
  stars: number,
  address: string,
): Object => (
  <Content>
    <Name>{name}</Name>
    <ReviewStars
      shouldShowReviewsText={false}
      textColor="white"
      isSmall={false}
      stars={stars}
      reviews={0}
    />
    {renderBottomRow(address)}
  </Content>
);

type Props = {
  thumbnailImageURL: string,
  navigation: Object,
  imageURL: string,
  address: string,
  stars: number,
  name: string,
  id: string,
};

const RestaurantItemList = ({
  thumbnailImageURL,
  navigation,
  imageURL,
  address,
  stars,
  name,
  id,
}: Props): Object => (
  <CardContainer>
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(CONSTANTS.ROUTE_RESTAURANT_DETAIL, {
        [CONSTANTS.NAVIGATION_PARAM_ID]: id,
      })
      }
    >
      <ContentWrapper>
        {renderRestaurantImage(thumbnailImageURL, imageURL)}
        <DarkLayer />
        {renderRestaurantInfo(name, stars, address)}
      </ContentWrapper>
    </TouchableWithoutFeedback>
  </CardContainer>
);

export default withNavigation(RestaurantItemList);
