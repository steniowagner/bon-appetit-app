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
  margin-top: ${({ theme, isFirst }) => {
    const marginTop = (Platform.OS === 'android' ? theme.metrics.mediumSize : theme.metrics.largeSize);
    return (isFirst ? marginTop : 0);
  }}px;
  margin-bottom: ${({ theme }) => {
    const marginBottom = (Platform.OS === 'android' ? theme.metrics.mediumSize : theme.metrics.largeSize);
    return marginBottom;
  }}px;
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
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.8%' : '2.4%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Bold;
`;

const ProfileAvatarWrapper = styled(View)`
  width: 20%;
  height: 100%;
  justify-content: center;
`;

const ProfileAvatar = styled(FastImage).attrs({
  source: ({ uri }) => ({ uri }),
})`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  width: 48px;
  height: 48px;
  border-radius: 48px;
`;

const ReviewText = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  margin-top: ${({ theme }) => {
    const marginTop = (Platform.OS === 'android' ? theme.metrics.extraSmallSize / 2 : theme.metrics.extraSmallSize);
    return marginTop;
  }}px;
  font-size: ${({ theme }) => {
    const percentage = (Platform.OS === 'android' ? '2.4%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  font-family: CircularStd-Medium;
`;

const TopContetWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  reviewerImage: string,
  reviewer: string,
  review: string,
  isFirst: boolean,
  stars: number,
};

const renderProfileAvatar = (reviewerImage: string): Object => (
  <ProfileAvatarWrapper>
    <ProfileAvatar
      uri={reviewerImage}
    />
  </ProfileAvatarWrapper>
);

const renderMainContent = (reviewer: string, review: string, stars: number): Object => (
  <MainContent>
    <TopContetWrapper>
      <ReviewerName>
        {reviewer}
      </ReviewerName>
      <ReviewStars
        shouldShowReviewsText={false}
        stars={stars}
      />
    </TopContetWrapper>
    <ReviewText>
      {review}
    </ReviewText>
  </MainContent>
);

const ReviewItemList = ({
  reviewerImage,
  reviewer,
  review,
  isFirst,
  stars,
}: Props): Object => (
  <Container
    isFirst={isFirst}
  >
    {renderProfileAvatar(reviewerImage)}
    {renderMainContent(reviewer, review, stars)}
  </Container>
);

export default ReviewItemList;
