// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import { getItemFromStorage, persistItemInStorage } from 'components/utils/AsyncStoarageManager';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SectionTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Bold;
  font-size:  ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2.6%' : '3%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
`;

const ItemWrapper = styled(View)`
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const LineSeparator = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 0.5px;
`;

const LanguageSectionWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const SelectedLanguageText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: CircularStd-Medium;
  font-size:  ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2.6%' : '3%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
`;

const SmallText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px 0`}
  font-family: CircularStd-Book;
  font-size:  ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
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
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}
  font-family: CircularStd-Bold;
  font-size:  ${({ theme }) => {
    const percentage = (Platform.OS === 'ios' ? '2.4%' : '2.8%');
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
`;

const OptionWithouDescriptionWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MultipleOptionsTitleWrapper = styled(View)`
  padding: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.mediumSize}px ${theme.metrics.largeSize}px`};
`;

const receivePromotionsOptionDescription = 'By enabling this option, the app will periodically use your current location and will show promotions that are happening near you.';
const notificationsSoundOptionDescription = 'Enable the sound of the Notifications';

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: appStyle.colors.primaryColor,
    },
    headerTintColor: appStyle.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyle.colors.defaultWhite,
      fontFamily: 'CircularStd-Bold',
    },
  };

  state = {
    receiveNearMe: false,
    notificationsSound: false,
    receiveAllNotifications: false,
    whenPastSearch: false,
    whenAboutPromotions: false,
  };

  async componentDidMount() {
    const receiveNearMeFromStorage = await getItemFromStorage('receiveNearMe', false);
    const notificationsSoundFromStorage = await getItemFromStorage('notificationsSound', false);
    const receiveAllNotificationsFromStorage = await getItemFromStorage('receiveAllNotifications', false);
    const whenPastSearchFromStorage = await getItemFromStorage('whenPastSearch', false);
    const whenAboutPromotionsFromStorage = await getItemFromStorage('whenAboutPromotions', false);

    this.setState({
      receiveNearMe: (receiveNearMeFromStorage === 'true'),
      notificationsSound: (notificationsSoundFromStorage === 'true'),
      receiveAllNotifications: (receiveAllNotificationsFromStorage === 'true'),
      whenPastSearch: (whenPastSearchFromStorage === 'true'),
      whenAboutPromotions: (whenAboutPromotionsFromStorage === 'true'),
    });
  }

  handleSwitchToggle = async (option: string): void => {
    const { state } = this;
    const value = !state[option];

    this.setState({
      [option]: value,
    });

    await persistItemInStorage(option, value);
  }

  renderSelectLanguageSection = (): Object => (
    <ItemWrapper>
      <LanguageSectionWrapper>
        <SectionTitleText>
          Select Language
        </SectionTitleText>
        <TouchableOpacity>
          <SelectedLanguageText>
            English, US
          </SelectedLanguageText>
        </TouchableOpacity>
      </LanguageSectionWrapper>
    </ItemWrapper>
  );

  renderOptionWithDescription = (title: string, description: string): Object => (
    <OptionTextWrapper>
      <SectionTitleText>
        {title}
      </SectionTitleText>
      <SmallText>
        {description}
      </SmallText>
    </OptionTextWrapper>
  );

  renderOptionWithoutDescription = (title: string, id: string): Object => (
    <OptionWithouDescriptionWrapper>
      <MediumText>
        {title}
      </MediumText>
      {this.renderSwitch(id)}
    </OptionWithouDescriptionWrapper>
  );

  renderSwitch = (id: string): Object => {
    const thumbTintColor = (Platform.OS === 'android') ? appStyle.colors.red : '';
    const { state } = this;
    const value = state[id];

    return (
      <Switch
        onValueChange={() => this.handleSwitchToggle(id)}
        onTintColor={appStyle.colors.red}
        thumbTintColor={thumbTintColor}
        value={value}
      />
    );
  }

  render() {
    return (
      <Container>
        <ScrollView>
          {this.renderSelectLanguageSection()}
          <LineSeparator />

          <ItemWrapper>
            <OptionWrapper>
              {this.renderOptionWithDescription('Receive Promotions near me', receivePromotionsOptionDescription)}
              {this.renderSwitch('receiveNearMe')}
            </OptionWrapper>
          </ItemWrapper>
          <LineSeparator />

          <ItemWrapper>
            <OptionWrapper>
              {this.renderOptionWithDescription('Notifications Sound', notificationsSoundOptionDescription)}
              {this.renderSwitch('notificationsSound')}
            </OptionWrapper>
          </ItemWrapper>
          <LineSeparator />

          <MultipleOptionsTitleWrapper>
            <SectionTitleText>
              Push Notifications
            </SectionTitleText>
          </MultipleOptionsTitleWrapper>

          {this.renderOptionWithoutDescription('Receive all notifications', 'receiveAllNotifications')}
          <LineSeparator />

          {this.renderOptionWithoutDescription('When is about my past searches', 'whenPastSearch')}
          <LineSeparator />

          {this.renderOptionWithoutDescription('When is about promotions', 'whenAboutPromotions')}
        </ScrollView>
      </Container>
    );
  }
}

export default Settings;
