// @flow

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ReviewStars from 'components/common/ReviewStars';
import ImageCached from './components/ImageCached';

const CardContainer = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const DarkLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
  border-radius: 6px;
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

const BottomRowWrapper = styled(View)`
  justify-content: space-between;
  flex-direction: row;
`;

const LearnMoreButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  align-self: flex-end;
  align-items: flex-end;
  justify-content: flex-end;
`;

const LearnMoreIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'arrow-right',
  size: 28,
})`
  width: 28px;
  height: 28px;
`;

const AddressIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'map-marker',
  size: 20,
})``;

const renderLearnMoreButton = () => (
  <LearnMoreButtonWrapper>
    <LearnMoreIcon />
  </LearnMoreButtonWrapper>
);

const renderBottomRow = (address: string) => (
  <BottomRowWrapper>
    <AddressWrapper>
      <AddressIconWrapper>
        <AddressIcon />
      </AddressIconWrapper>
      <Address>
        {address}
      </Address>
    </AddressWrapper>
    {renderLearnMoreButton()}
  </BottomRowWrapper>
);

type Props = {
  name: string,
  address: string,
  picURL: string,
  stars: number,
};

const RestaurantItemList = ({
  name,
  address,
  stars,
  picURL,
}: Props) => (
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
      {renderBottomRow(address)}
    </Content>
  </CardContainer>
);

export default RestaurantItemList;
