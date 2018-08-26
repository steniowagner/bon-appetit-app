// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const ContentContainer = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const HeaderWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.metrics.largeSize}px ${theme.metrics.smallSize}px ${theme.metrics.extraSmallSize}px  ${theme.metrics.largeSize}px`}
`;

const SeeAllButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SeeAllTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')};
  font-family: CircularStd-Black;
`;

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3%')};
  font-family: CircularStd-Black;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.red,
  name: 'chevron-right',
  size: 28,
})`
  margin-left: -5px;
  width: 28px;
  height: 28px;
`;

type Props = {
  title: string,
  nextRoute: string,
  navigation: Function,
  render: any,
}

const handleButtonPress = (nextRoute: string, navigation: Function, title: string): void => {
  navigation.navigate(nextRoute, { title });
};

const renderSectionHeader = (title: string, nextRoute: string, navigation: Function): Object => (
  <HeaderWrapper>
    <SectionTitle>
      {title}
    </SectionTitle>
    <SeeAllButtonWrapper onPress={() => handleButtonPress(nextRoute, navigation, title)}>
      <SeeAllTitle>
        See All
      </SeeAllTitle>
      <ArrowIcon />
    </SeeAllButtonWrapper>
  </HeaderWrapper>
);

const Section = ({
  title,
  nextRoute,
  navigation,
  render,
}: Props) => (
  <ContentContainer>
    <View>
      {renderSectionHeader(title, nextRoute, navigation)}
      {render()}
    </View>
  </ContentContainer>
);

export default withNavigation(Section);
