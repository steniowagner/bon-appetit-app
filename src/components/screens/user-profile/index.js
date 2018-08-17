import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components';
import appStyle from 'styles';

import HeartBeating from './components/HeartBeating';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white}
`;

const Content = styled(View)`
  align-items: center;
`;

const ProfileAvatarWrapper = styled(Image).attrs({
  source: require('../../../styles/img/steniowagner.png'),
})`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ContetTitleWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const BigText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')};
`;

const SmallText = styled(Text)`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px ${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px`};
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')};
  text-align: center;
  font-family: CircularStd-Bold;
`;

const TextWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.largeSize}
  align-items: center;
`;

const SocialContactsWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SocialButtonsWrapper = styled(View)`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.extraLargeSize}px 0`}
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

const SocialButton = styled(TouchableOpacity)`
  background-color: ${({ theme, type }) => (type === 'linkedin' ? theme.colors.linkedin : theme.colors.github)};
  margin: ${({ theme }) => `0 ${theme.metrics.smallSize}px`};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const getSmallText = () => 'I’m Stenio, and I’m a Full Stack Engineer with interests in Javascript world, including. NodeJS and, obviously, the React Ecossystem (ReactJS, React-Native and GraphQL).\n\nI also have a good eye for design, and that’s why I’m passionate about building amazing, beautiful and problem-solver things to make the other people\'s lives even better!';

const handleSocialButtonClick = async (type) => {
  const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/steniowagner';
  const GITHUB_PROFILE_URL = 'https://github.com/steniowagner';

  const URL = (type === 'linkedin' ? LINKEDIN_PROFILE_URL : GITHUB_PROFILE_URL);

  const canOpenURL = await Linking.canOpenURL(URL);

  if (canOpenURL) {
    Linking.openURL(URL);
  } else {
    alert('Unfortunately, this URL can\'t be opened on your devices! :(');
  }
};

const renderMainTitleContent = () => (
  <ContetTitleWrapper>
    <BigText>
      Developed with
    </BigText>
    <HeartBeating />
    <BigText>
      by Stenio Wagner
    </BigText>
  </ContetTitleWrapper>
);

const renderMainTextSection = () => (
  <TextWrapper>
    <BigText>
      Hey!
    </BigText>
    <SmallText>
      {getSmallText()}
    </SmallText>
  </TextWrapper>
);

const renderSocialButton = (type: string, iconName: string, size: number): Object => (
  <ButtonWrapper>
    <SocialButton
      onPress={() => handleSocialButtonClick(type)}
      type={type}
    >
      <Icon
        name={iconName}
        size={size}
        color={appStyle.colors.defaultWhite}
      />
    </SocialButton>
  </ButtonWrapper>
);

const renderSocialContactsSection = () => (
  <SocialContactsWrapper>
    <BigText>
      My Social Contacts
    </BigText>
    <SocialButtonsWrapper>
      {renderSocialButton('linkedin', 'linkedin', 28)}
      {renderSocialButton('github', 'github-circle', 38)}
    </SocialButtonsWrapper>
  </SocialContactsWrapper>
);

const Profile = () => (
  <Container>
    <ScrollView>
      <Content>
        <ProfileAvatarWrapper />
        {renderMainTitleContent()}
        {renderMainTextSection()}
        {renderSocialContactsSection()}
      </Content>
    </ScrollView>
  </Container>
);

Profile.navigationOptions = {
  title: 'Profile',
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

export default Profile;
