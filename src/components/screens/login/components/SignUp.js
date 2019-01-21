// @flow

import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import ButtonContent from './ButtonContent';
import { DefaultText } from './Common';
import Input from './Input';
import appStyles from '~/styles';

const Container = styled(View)`
  height: 100%;
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

const SignUp = (): Object => (
  <Container>
    {renderInput('E-mail', 'email-outline', 'emailAddress')}
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
