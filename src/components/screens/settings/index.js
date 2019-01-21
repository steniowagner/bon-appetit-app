// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components';
import appStyle from '~/styles';

import {
  getItemFromStorage,
  persistItemInStorage,
} from '~/utils/AsyncStoarageManager';

import { SWITCH_STATE_REFS, getItemConfig, TYPES } from './ItemConfig';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SectionTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '4.2%' : '4.8%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
`;

const ItemWrapper = styled(View)`
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const LineSeparator = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('0.1%')};
  background-color: ${({ theme }) => theme.colors.gray};
`;

const LanguageSectionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SelectedLanguageText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '4%' : '4.8%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
`;

const SmallText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px 0`};
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '3.8%' : '4%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
`;

const OptionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionTextWrapper = styled(View)`
  width: 75%;
`;

const MediumText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'ios' ? '4%' : '4.5%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
`;

const OptionWithouDescriptionWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MultipleOptionsTitleWrapper = styled(View)`
  padding: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.mediumSize}px ${
    theme.metrics.largeSize
  }px`};
`;

type State = {
  receiveAllNotifications: boolean,
  whenIsAboutPromotions: boolean,
  notificationsSound: boolean,
  promotionsNearMe: boolean,
  whenPastSearch: boolean,
};

class Settings extends Component<{}, State> {
  state = {
    receiveAllNotifications: false,
    whenIsAboutPromotions: false,
    notificationsSound: false,
    promotionsNearMe: false,
    whenPastSearch: false,
  };

  async componentDidMount() {
    const receiveAllNotificationsFromStorage = await getItemFromStorage(
      SWITCH_STATE_REFS.RECEIVE_ALL_NOTIFICATIONS,
      false,
    );

    const whenAboutPromotionsFromStorage = await getItemFromStorage(
      SWITCH_STATE_REFS.WHEN_ABOUT_DISCOUNTS,
      false,
    );

    const notificationsSoundFromStorage = await getItemFromStorage(
      SWITCH_STATE_REFS.NOTIFICATIONS_SOUND,
      false,
    );

    const receiveNearMeFromStorage = await getItemFromStorage(
      SWITCH_STATE_REFS.PROMOTIONS_NEAR_ME,
      false,
    );

    const whenPastSearchFromStorage = await getItemFromStorage(
      SWITCH_STATE_REFS.WHEN_PAST_SEARCH,
      false,
    );

    this.setState({
      receiveAllNotifications: Boolean(receiveAllNotificationsFromStorage),
      whenIsAboutPromotions: Boolean(whenAboutPromotionsFromStorage),
      notificationsSound: Boolean(notificationsSoundFromStorage),
      promotionsNearMe: Boolean(receiveNearMeFromStorage),
      whenPastSearch: Boolean(whenPastSearchFromStorage),
    });
  }

  handleSwitchToggle = async (option: string): Promise<void> => {
    const { state } = this;

    const value = !state[option];

    this.setState({
      [option]: value,
    });

    await persistItemInStorage(option, value);
  };

  renderSelectLanguageSection = (): Object => (
    <ItemWrapper>
      <LanguageSectionWrapper>
        <SectionTitleText>Select Language</SectionTitleText>
        <TouchableOpacity>
          <SelectedLanguageText>English, US</SelectedLanguageText>
        </TouchableOpacity>
      </LanguageSectionWrapper>
    </ItemWrapper>
  );

  renderOptionWithDescription = (
    title: string,
    description: string,
  ): Object => (
    <OptionTextWrapper>
      <SectionTitleText>{title}</SectionTitleText>
      <SmallText>{description}</SmallText>
    </OptionTextWrapper>
  );

  renderSwitch = (id: string): Object => {
    const thumbTintColor = Platform.OS === 'android' ? appStyle.colors.red : '';
    const { state } = this;
    const value = state[id];

    return (
      <Switch
        trackColor={{ false: '', true: appStyle.colors.red }}
        onValueChange={() => this.handleSwitchToggle(id)}
        thumbColor={thumbTintColor}
        value={value}
      />
    );
  };

  renderItemWitDescription = (type: string): Object => {
    const config = getItemConfig(type);

    const { switchId, title, text } = config;

    return (
      <ItemWrapper>
        <OptionWrapper>
          {this.renderOptionWithDescription(title, text)}
          {this.renderSwitch(switchId)}
        </OptionWrapper>
      </ItemWrapper>
    );
  };

  renderItemWithoutDescription = (type: string): Object => {
    const config = getItemConfig(type);

    const { switchId, title } = config;

    return (
      <OptionWithouDescriptionWrapper>
        <MediumText>{title}</MediumText>
        {this.renderSwitch(switchId)}
      </OptionWithouDescriptionWrapper>
    );
  };

  render() {
    return (
      <Container>
        <ScrollView
          alwaysBounceVertical={false}
        >
          {this.renderSelectLanguageSection()}
          <LineSeparator />
          {this.renderItemWitDescription(TYPES.PROMOTIONS_NEAR_ME)}
          {this.renderItemWitDescription(TYPES.NOTIFICATIONS_SOUND)}
          <LineSeparator />
          <MultipleOptionsTitleWrapper>
            <SectionTitleText>Push Notifications</SectionTitleText>
          </MultipleOptionsTitleWrapper>
          {this.renderItemWithoutDescription(TYPES.RECEIVE_ALL_NOTIFICATIONS)}
          {this.renderItemWithoutDescription(TYPES.WHEN_PAST_SEARCH)}
          {this.renderItemWithoutDescription(TYPES.WHEN_ABOUT_DISCOUNTS)}
        </ScrollView>
      </Container>
    );
  }
}

export default Settings;
