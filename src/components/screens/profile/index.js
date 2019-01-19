// @flow

import React from 'react';
import {
  TouchableOpacity, Linking, Platform, View, Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import FastImage from 'react-native-fast-image';
import { TYPES, SOCIAL_BUTTONS } from './components/SOCIAL_BUTTONS';
import HeartBeating from './components/HeartBeating';

const PROFILE_IMAGE_URL = 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled(View)`
  align-items: center;
`;

const ProfileImageWrapper = styled(View)`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ProfileImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const NameTextWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SubTextWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.25%')};
`;

const SubText = styled(Text)`
  color: ${({ theme }) => theme.colors.lightDarkLayer};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')};
`;

const SocialContactsWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SocialButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const SocialButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;

const AboutMeWrapper = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const AboutMeDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.darkLayer};
  font-size: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '2.5%' : '2.2%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  text-align: left;
  font-family: CircularStd-Medium;
`;

const AboutMeText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.7%')};
`;

const SocialIcon = styled(Icon).attrs(({ name }) => ({
  size: 21,
  name,
}))`
  color: ${({ theme }) => theme.colors.white};
  margin: 1.5px 0px 0px 1px;
`;

const ButtonWrapper = styled(LinearGradient).attrs({
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 0,
  },
})`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  justify-content: center;
  align-items: center;
`;

const handleSocialButtonClick = async (url: string): void => {
  const canOpenURL = await Linking.canOpenURL(url);

  if (canOpenURL) {
    Linking.openURL(url);
  } else {
    alert("Unfortunately, this URL can't be opened on your devices! :(");
  }
};

const renderSocialButton = (type: string): Object => {
  const { iconName, colors, url } = SOCIAL_BUTTONS[type];

  return (
    <ButtonWrapper
      colors={colors}
    >
      <SocialButton
        onPress={() => handleSocialButtonClick(url)}
      >
        <SocialIcon
          name={iconName}
        />
      </SocialButton>
    </ButtonWrapper>
  );
};

const Profile = () => (
  <Container>
    <Content>
      <ProfileImageWrapper>
        <ProfileImage
          uri={PROFILE_IMAGE_URL}
        />
      </ProfileImageWrapper>
      <NameTextWrapper>
        <NameText>Stenio Wagner</NameText>
      </NameTextWrapper>
      <SubTextWrapper>
        <SubText>Full Stack Engineer</SubText>
        <HeartBeating />
      </SubTextWrapper>
      <SocialContactsWrapper>
        <SocialButtonsWrapper>
          {renderSocialButton(TYPES.LINKEDIN)}
          {renderSocialButton(TYPES.GITHUB)}
          {renderSocialButton(TYPES.INSTAGRAM)}
        </SocialButtonsWrapper>
      </SocialContactsWrapper>
      <AboutMeWrapper>
        <AboutMeText>About Me</AboutMeText>
        <AboutMeDescription>
          {
            "A Full Stack Engineer with interests in the Javascript world, including NodeJS and, obviously, the React Ecossystem (ReactJS, React-Native and GraphQL).\n\nI also have a good eye for design, and that’s why I’m passionate about building amazing, beautiful and problem-solver things to contribute and sum with other people's lives!"
          }
        </AboutMeDescription>
      </AboutMeWrapper>
    </Content>
  </Container>
);

export default Profile;
