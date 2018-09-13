import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

const Wrapper = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  justify-content: center;
  align-items: center;
`;

const FoodNotFoundIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.green,
  name: 'food-off',
  size: 120,
})`
  width: 120px;
  height: 120px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const BigText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('4.5%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  fontFamily: CircularStd-Black;
  text-align: center;
`;

const MediumText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.2%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  fontFamily: CircularStd-Bold;
  text-align: center;
`;

const SmallText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  fontFamily: CircularStd-Medium;
  text-align: center;
`;

const RestaurantsNotFound = () => (
  <Container>
    <Wrapper>
      <FoodNotFoundIcon />
      <BigText>
        Oops!
      </BigText>
      <SmallText>
        {'There\'s no Restaurants that matches with your Search.'}
      </SmallText>
      <MediumText>
        How about looking for something else?
      </MediumText>
    </Wrapper>
  </Container>
);

export default RestaurantsNotFound;
