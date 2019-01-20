// @flow

import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import ButtonContent from './ButtonContent';
import { DefaultText } from './Common';
import Input from './CustomInput';
import appStyles from '~/styles';

const Container = styled(View)`
  height: 100%;
`;

const renderInput = (
  placeholder: string,
  iconName: string,
  type: string,
  autoFocus: boolean = false,
): Object => (
  <Input
    placeholder={placeholder}
    autoFocus={autoFocus}
    iconName={iconName}
    type={type}
  />
);

const SignUp = (): Object => (
  <Container>
    {renderInput('E-mail', 'email-outline', 'emailAddress', true)}
    {renderInput('Password', 'lock-outline', 'password')}
    {renderInput('Confirm Password', 'lock-reset', 'password')}
    <ButtonContent
      color={appStyles.colors.primaryColor}
    >
      <DefaultText>SIGN UP</DefaultText>
    </ButtonContent>
  </Container>
);

export default SignUp;
