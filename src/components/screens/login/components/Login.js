// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import ButtonContent from './ButtonContent';
import { DefaultText } from './Common';
import Input from './Input';

import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const ButtonIcon = styled(Icon).attrs(({ iconName }) => ({
  name: iconName,
  size: 24,
}))`
  color: ${({ theme }) => theme.colors.defaultWhite};
  margin-left: ${({ iconName }) => (iconName === 'facebook' ? -4 : 0)}px;
`;

const SocialButtonWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const SocialButtonsContainer = styled(View)`
  height: 50%;
  justify-content: flex-end;
`;

const ForgotPasswordContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ForgotPasswordWrapper = styled(View)`
  flex-direction: row;
`;

const RecoverTextButton = styled(TouchableOpacity)`
  margin-left: 4px;
`;

const renderInput = (
  placeholder: string,
  iconName: string,
  type: string,
): Object => (
  <Input
    placeholder={placeholder}
    iconName={iconName}
    type={type}
  />
);

const renderForgotPasswordText = (): Object => (
  <ForgotPasswordContainer>
    <ForgotPasswordWrapper>
      <DefaultText>Forgot your Password?</DefaultText>
      <RecoverTextButton>
        <DefaultText
          color={appStyles.colors.primaryColor}
        >
          Recover here
        </DefaultText>
      </RecoverTextButton>
    </ForgotPasswordWrapper>
  </ForgotPasswordContainer>
);

const renderSocialButton = (
  text: string,
  icon: string,
  color: string,
): Object => (
  <ButtonContent
    color={color}
  >
    <SocialButtonWrapper>
      <ButtonIcon
        iconName={icon}
      />
      <DefaultText>{text}</DefaultText>
      <View />
    </SocialButtonWrapper>
  </ButtonContent>
);

const renderSocialButtons = (): Object => (
  <SocialButtonsContainer>
    {renderSocialButton(
      'Login with Facebook',
      'facebook',
      appStyles.colors.facebook,
    )}
    {renderSocialButton(
      'Login with Google+',
      'google-plus',
      appStyles.colors.googlePlus,
    )}
  </SocialButtonsContainer>
);

const LoginComponent = (): Object => (
  <Container>
    {renderInput('E-mail', 'email-outline', 'emailAddress')}
    {renderInput('Password', 'lock-outline', 'password')}
    <ButtonContent
      color={appStyles.colors.primaryColor}
    >
      <DefaultText>LOGIN</DefaultText>
    </ButtonContent>
    {renderForgotPasswordText()}
    {renderSocialButtons()}
  </Container>
);

export default LoginComponent;
