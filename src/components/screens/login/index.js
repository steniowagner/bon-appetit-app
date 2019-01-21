// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  Animated,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native';

import styled from 'styled-components';

import SignUpComponent from './components/SignUp';
import LoginComponent from './components/Login';

import appStyles from '~/styles';

const Container = styled(View)`
  flex: 1;
`;

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  padding-horizontal: ${({ theme }) => 2 * theme.metrics.extraLargeSize}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.intermediateDarkLayer};
`;

const Title = styled(Text)`
  font-family: Modesta-Script;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('11.5%')}px;
`;

const TitleWrapper = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
`;

const BackgroundImage = styled(Image).attrs({
  source: { uri: 'login' },
  resizeMode: 'cover',
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NavigationTitleWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => 2 * theme.metrics.extraLargeSize}px;
`;

const MAX_FONT_SIZE = appStyles.metrics.getWidthFromDP('8.5%');
const MIN_FONT_SIZE = appStyles.metrics.getWidthFromDP('5%');

const LAYOUTS = [
  { Layout: LoginComponent, id: 'login' },
  { Layout: SignUpComponent, id: 'signup' },
];

class Login extends Component {
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);
  _flatListRef: Object = {};

  componentDidMount() {
    this._flatListRef.getScrollResponder().setNativeProps({
      scrollEnabled: false,
    });
  }

  onClickLoginButton = (): void => {
    Animated.parallel([
      Animated.timing(this._loginFontSize, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this._signUpFontSize, {
        toValue: 0,
        duration: 200,
      }),
    ]).start(this._flatListRef.scrollToIndex({ animated: true, index: 0 }));
  };

  onClickSignUpButton = (): void => {
    Animated.parallel([
      Animated.timing(this._loginFontSize, {
        toValue: 0,
        duration: 200,
      }),
      Animated.timing(this._signUpFontSize, {
        toValue: 1,
        duration: 200,
      }),
    ]).start(this._flatListRef.scrollToIndex({ animated: true, index: 1 }));
  };

  renderContent = (): Object => (
    <FlatList
      renderItem={({ item }) => {
        const { Layout } = item;

        return (
          <ContentWrapper>
            <Layout />
          </ContentWrapper>
        );
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      ref={(ref: any): void => {
        this._flatListRef = ref;
      }}
      data={LAYOUTS}
      pagingEnabled
      horizontal
    />
  );

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <BackgroundImage />
        <DarkLayer />
        <Wrapper>
          <TitleWrapper>
            <Title>Bon Appetit!</Title>
          </TitleWrapper>
          <NavigationTitleWrapper>
            <TouchableOpacity
              onPress={this.onClickLoginButton}
            >
              <Animated.Text
                style={{
                  paddingBottom: appStyles.metrics.getHeightFromDP('3%'),
                  paddingRight: appStyles.metrics.getHeightFromDP('4%'),
                  paddingTop: appStyles.metrics.getHeightFromDP('1%'),
                  fontFamily: 'CircularStd-Black',
                  color: this._loginFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.colors.gray,
                      appStyles.colors.defaultWhite,
                    ],
                    extrapolate: 'clamp',
                  }),
                  fontSize: this._loginFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [MIN_FONT_SIZE, MAX_FONT_SIZE],
                    extrapolate: 'clamp',
                  }),
                }}
              >
                Login
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onClickSignUpButton}
            >
              <Animated.Text
                style={{
                  paddingBottom: appStyles.metrics.getHeightFromDP('3%'),
                  paddingLeft: appStyles.metrics.getHeightFromDP('4%'),
                  paddingTop: appStyles.metrics.getHeightFromDP('1%'),
                  fontFamily: 'CircularStd-Black',
                  color: this._signUpFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.colors.gray,
                      appStyles.colors.defaultWhite,
                    ],
                    extrapolate: 'clamp',
                  }),
                  fontSize: this._signUpFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [MIN_FONT_SIZE, MAX_FONT_SIZE],
                    extrapolate: 'clamp',
                  }),
                }}
              >
                Sign Up
              </Animated.Text>
            </TouchableOpacity>
          </NavigationTitleWrapper>
          {this.renderContent()}
        </Wrapper>
      </Container>
    );
  }
}

export default Login;
