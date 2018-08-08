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
  color: ${({ theme, color }) => (color === 'light' ? theme.colors.defaultWhite : theme.colors.darkText)};
  margin: 2px 0 0 8px;
  font-size: 12px;
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

const getStars = (grade) => {
  const MAX_GRADE = 5;
  const quantityEmptyStars = MAX_GRADE - Math.ceil(grade);
  const starsFromGrade = [];

  let currentGrade = grade;

  if (currentGrade > MAX_GRADE) {
    return Array(MAX_GRADE).fill(<FullStar />);
  }

  while (currentGrade >= 1) {
    starsFromGrade.push(<FullStar key={Math.random()} />);
    currentGrade--;
  }

  if (currentGrade === 0.5) {
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
      {starsFromGrade.map(star => (
        star
      ))}
    </WrapperStars>
  );
};

type Props = {
  grade: number,
  shouldShowReviewsText: boolean,
  reviews: number,
  color: string,
};

const StarGrade = ({
  grade,
  shouldShowReviewsText,
  reviews,
  color,
} : Props) => (
  <Wrapper>
    {renderStars(grade)}
    {shouldShowReviewsText
      && (
      <Reviews color={color}>
        {`${reviews} Reviews`}
      </Reviews>)}
  </Wrapper>
);

export default StarGrade;
