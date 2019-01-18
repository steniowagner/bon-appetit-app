// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';

const ContentContainer = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const HeaderWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.metrics.largeSize}px ${theme.metrics.smallSize}px ${
    theme.metrics.extraSmallSize
  }px  ${theme.metrics.largeSize}px`};
`;

const SeeAllButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SectionText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')};
`;

const SeeAllText = styled(Text)`
  color: ${({ theme }) => theme.colors.primaryColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')};
  font-family: CircularStd-Bold;
`;

const ArrowIcon = styled(Icon).attrs({
  name: 'chevron-right',
  size: 25,
})`
  color: ${({ theme }) => theme.colors.primaryColor};
  margin-left: -5px;
  width: 25px;
  height: 25px;
`;

const renderSectionHeader = (
  navigation: Object,
  nextRoute: string,
  title: string,
): Object => (
  <HeaderWrapper>
    <SectionText>{title}</SectionText>
    <SeeAllButtonWrapper
      onPress={() => navigation.navigate(nextRoute)}
    >
      <SeeAllText>See All</SeeAllText>
      <ArrowIcon />
    </SeeAllButtonWrapper>
  </HeaderWrapper>
);

type Props = {
  navigation: Object,
  nextRoute: string,
  children: Object,
  title: string,
};

const Section = ({
  title, nextRoute, navigation, children,
}: Props) => (
  <ContentContainer>
    <View>
      {renderSectionHeader(navigation, nextRoute, title)}
      {children}
    </View>
  </ContentContainer>
);

export default withNavigation(Section);
