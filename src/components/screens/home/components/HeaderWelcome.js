import React from 'react';
import { Text, View } from 'react-native';

import ImageCached from 'components/common/ImageCached';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const ProfileAvatarWrapper = styled(View)`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primaryColor};
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const WelcomeUsernameText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  fontFamily: CircularStd-Black;
`;

const HungryText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Bold;
`;

const TextWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const IMAGE_URL = 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/john-doe.jpg';

const HeaderWelcome = (): Object => (
  <Container>
    <ProfileAvatarWrapper>
      <ImageCached
        border={40}
        uri={IMAGE_URL}
      />
    </ProfileAvatarWrapper>
    <TextWrapper>
      <WelcomeUsernameText>
        Hey, John Doe!
      </WelcomeUsernameText>
      <HungryText>
        Are you hungry today?
      </HungryText>
    </TextWrapper>
  </Container>
);

export default HeaderWelcome;
