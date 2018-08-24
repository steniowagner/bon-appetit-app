// @flow

import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components';

import ReviewStars from 'components/common/ReviewStars';
import Shimmer from 'components/common/shimmer';

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
`;

const ProfileAvatar = styled(Image).attrs({
  source: ({ uri }) => ({ uri }),
})`
  margin: ${({ theme }) => `${theme.metrics.largeSize}px 0 ${theme.metrics.largeSize}px 0`}
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const ProfileAvatarShimmer = styled(Shimmer)`
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
  reviewerImage: string,
  review: string,
  reviewer: string,
  isFirst: boolean,
  stars: number,
};

type State = {
  isLoaded: boolean,
};

class ReviewItemList extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  }

  onImageLoaded = () => {
    this.setState({
      isImageLoaded: true,
    });
  }

  renderProfileAvatar = () => {
    const { reviewerImage } = this.props;
    const { isImageLoaded } = this.state;

    return (
      <ProfileAvatarWrapper>
        <ProfileAvatar
          onLoad={() => this.onImageLoaded()}
          uri={reviewerImage}
        />
        {!isImageLoaded && <ProfileAvatarShimmer />}
      </ProfileAvatarWrapper>
    );
  }

  renderMainContent = () => {
    const {
      reviewer,
      review,
      stars,
    } = this.props;

    return (
      <MainContent>
        <TopContetWrapper>
          <ReviewerName>
            {reviewer}
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
    );
  }

  render() {
    const { isFirst } = this.props;

    return (
      <Container
        isFirst={isFirst}
      >
        {this.renderProfileAvatar()}
        {this.renderMainContent()}
      </Container>
    );
  }
}

export default ReviewItemList;
