// @flow

import React from 'react';
import { Text, View, Platform } from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  margin-top: ${({ theme, isFirst }) => (isFirst ? theme.metrics.mediumSize : 0)}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const MainContent = styled(View)`
  width: 80%;
  height: 100%;
  justify-content: center;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ReviewerName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')}px;
  font-family: CircularStd-Bold;
`;

const ProfileAvatarWrapper = styled(View)`
  width: 20%;
  height: 100%;
  justify-content: center;
`;

const ProfileAvatar = styled(FastImage).attrs({
  source: ({ uri }) => ({ uri }),
  priority: FastImage.priority.high,
})`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const ReviewText = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  margin-top: ${({ theme }) => {
    const marginTop = (Platform.OS === 'android' ? theme.metrics.extraSmallSize / 2 : theme.metrics.extraSmallSize);
    return marginTop;
  }}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')}px;
  font-family: CircularStd-Book;
`;

const TopContetWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

type Props = {
  profileImageURL: string,
  review: string,
  name: string,
  isFirst: boolean,
  stars: number,
};

const renderProfileAvatar = (profileImageURL: string): Object => (
  <ProfileAvatarWrapper>
    <ProfileAvatar
      uri={profileImageURL}
    />
  </ProfileAvatarWrapper>
);

const renderMainContent = (name: string, review: string, stars: number): Object => (
  <MainContent>
    <TopContetWrapper>
      <ReviewerName>
        {name}
      </ReviewerName>
      <ReviewStars
        stars={stars}
      />
    </TopContetWrapper>
    <ReviewText>
      {review}
    </ReviewText>
  </MainContent>
);

const ReviewItemList = ({
  profileImageURL,
  name,
  review,
  isFirst,
  stars,
}: Props): Object => (
  <Container
    isFirst={isFirst}
  >
    {renderProfileAvatar(profileImageURL)}
    {renderMainContent(name, review, stars)}
  </Container>
);

export default ReviewItemList;
