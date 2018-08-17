import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Platform,
} from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SectionTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
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
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
`;

const SmallText = styled(Text)`
  color: ${({ theme }) => theme.colors.subText};
  margin: ${({ theme }) => `${theme.metrics.extraSmallSize}px 0`}
  font-family: CircularStd-Medium;
  font-size:  ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
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
  font-size:  ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
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
const APP_STORAGE_KEY = '@BON_APPETIT';

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
      fontWeight: '900',
      fontSize: appStyle.metrics.navigationHeaderFontSize,
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
    const receiveNearMe = await this.getItemFromStorage(`${APP_STORAGE_KEY}:receiveNearMe`);
    const notificationsSound = await this.getItemFromStorage(`${APP_STORAGE_KEY}:notificationsSound`);
    const receiveAllNotifications = await this.getItemFromStorage(`${APP_STORAGE_KEY}:receiveAllNotifications`);
    const whenPastSearch = await this.getItemFromStorage(`${APP_STORAGE_KEY}:whenPastSearch`);
    const whenAboutPromotions = await this.getItemFromStorage(`${APP_STORAGE_KEY}:whenAboutPromotions`);

    this.setState({
      receiveNearMe,
      notificationsSound,
      receiveAllNotifications,
      whenPastSearch,
      whenAboutPromotions,
    });
  }

  getItemFromStorage = async (key) => {
    const value = await AsyncStorage.getItem(`${APP_STORAGE_KEY}:${key}`);

    return value === 'true';
  }

  persistItemInStorage = async (key, value) => AsyncStorage.setItem(`${APP_STORAGE_KEY}:${key}`, value);


  handleSwitchToggle = async (option: string) => {
    const value = !this.state[option];

    this.setState({
      [option]: value,
    });

    await this.persistItemInStorage(option, value.toString());
  }

  renderSelectLanguageSection = () => (
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
    const value = this.state[id];

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
