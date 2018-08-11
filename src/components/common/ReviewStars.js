// @flow

import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Reviews = styled(Text)`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  margin: 2px 0 0 8px;
  fontFamily: CircularStd-Book;
  font-size: 14px;
`;

const FullStar = styled(Image).attrs({
  source: ({ theme }) => theme.images.starFull,
})`
  tint-color: ${({ theme }) => theme.colors.yellow};
  width: 18;
  height: 18;
`;

const HalfStar = styled(Image).attrs({
  source: ({ theme }) => theme.images.starHalf,
})`
  tint-color: ${({ theme }) => theme.colors.yellow};
  width: 18;
  height: 18;
`;

const EmptyStar = styled(Image).attrs({
  source: ({ theme }) => theme.images.starEmpty,
})`
  tint-color: ${({ theme }) => theme.colors.yellow};
  width: 18;
  height: 18;
`;

const WrapperStars = styled(View)`
  flex-direction: row;
`;

const getStars = (stars) => {
  const MAX_GRADE = 5;
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  let currentStars = stars;

  if (currentStars >= MAX_GRADE) {
    return Array(MAX_GRADE).fill().map(_empty => <FullStar key={Math.random()} />);
  }

  while (currentStars >= 1) {
    starsFromGrade.push(<FullStar key={Math.random()} />);
    currentStars--;
  }

  if (currentStars === 0.5) {
    starsFromGrade.push(<HalfStar key={Math.random()} />);
  }

  for (let i = 0; i < quantityEmptyStars; i++) {
    starsFromGrade.push(<EmptyStar key={Math.random()} />);
  }

  return starsFromGrade;
};

const renderStars = (grade: number): any => {
  const starsFromGrade = getStars(grade);

  return (
    <WrapperStars>
      {starsFromGrade.map(star => star)}
    </WrapperStars>
  );
};

type Props = {
  shouldShowReviewsText: ?boolean,
  reviews: ?number,
  textColor: ?string,
  stars: number,
};

const ReviewStars = ({
  stars,
  shouldShowReviewsText,
  reviews,
  textColor,
} : Props) => (
  <Wrapper>
    {renderStars(stars)}
    {shouldShowReviewsText
      && (
      <Reviews textColor={textColor}>
        {`${reviews}  ${reviews > 1 ? 'Reviews' : 'Review'}`}
      </Reviews>)}
  </Wrapper>
);

export default ReviewStars;
