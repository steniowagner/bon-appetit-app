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
  align-items: center;
  padding: ${({ theme }) => `${theme.metrics.largeSize}px ${theme.metrics.smallSize}px ${theme.metrics.extraSmallSize}px  ${theme.metrics.largeSize}px`}
`;

const SeeAllButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SectionText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')};
  font-family: CircularStd-Black;
`;

const SeeAllText = styled(Text)`
  color: ${({ theme }) => theme.colors.primaryColor};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')};
  font-family: CircularStd-Bold;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.primaryColor,
  name: 'chevron-right',
  size: 25,
})`
  margin-left: -5px;
  width: 25px;
  height: 25px;
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
    <SectionText>
      {title}
    </SectionText>
    <SeeAllButtonWrapper onPress={() => handleButtonPress(nextRoute, navigation, title)}>
      <SeeAllText>
        See All
      </SeeAllText>
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
