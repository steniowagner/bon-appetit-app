// @flow

import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  margin-top: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MainContent = styled(View)`
  width: 80%;
  height: 100%;
`;

const ReviewerName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')};
  font-family: CircularStd-Bold;
`;

const ProfileAvatarWrapper = styled(View)`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileAvatar = styled(Image).attrs({
  source: { uri: 'https://images.unsplash.com/photo-1528046929921-e2ef46232d30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2cfd7b8b1957f160a979ffd2e95779de&auto=format&fit=crop&w=1350&q=80' },
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
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.2%')};
  font-family: CircularStd-Book;
`;

const TopContetWrapper = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

type Props = {
  isFirst: boolean,
  reviwerName: string,
  review: string,
  stars: number,
};

const ReviewItemList = ({
  isFirst,
  reviwerName,
  review,
  stars,
}: Props) => (
  <Container isFirst={isFirst}>
    <ProfileAvatarWrapper>
      <ProfileAvatar />
    </ProfileAvatarWrapper>
    <MainContent>
      <TopContetWrapper>
        <ReviewerName>
          {reviwerName}
        </ReviewerName>
        <View>
          <ReviewStars
            shouldShowReviewsText={false}
            stars={stars}
          />
        </View>
      </TopContetWrapper>
      <ReviewText>
        {review}
      </ReviewText>
    </MainContent>
  </Container>
);

export default ReviewItemList;
