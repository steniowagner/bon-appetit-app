// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyle from 'styles';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Reviews = styled(Text)`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  margin-left: 8px;
  fontFamily: CircularStd-Book;
  font-size: 14px;
`;

const WrapperStars = styled(View)`
  flex-direction: row;
`;

const FullStar = <Icon name="star" size={16} color={appStyle.colors.yellow} />;

const HalfStar = <Icon name="star-half" size={16} color={appStyle.colors.yellow} />;

const EmptyStar = <Icon name="star-outline" size={16} color={appStyle.colors.yellow} />;

const getStars = (stars) => {
  const MAX_GRADE = 5;
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  let currentStars = stars;

  if (currentStars >= MAX_GRADE) {
    return Array(MAX_GRADE).fill().map(_empty => <FullStar key={Math.random()} />);
  }

  while (currentStars >= 1) {
    starsFromGrade.push(FullStar);
    currentStars--;
  }

  if (currentStars === 0.5) {
    starsFromGrade.push(HalfStar);
  }

  for (let i = 0; i < quantityEmptyStars; i++) {
    starsFromGrade.push(EmptyStar);
  }

  return starsFromGrade;
};

const renderStars = (grade: number): any => {
  const starsFromGrade = getStars(grade);
  return (
    <WrapperStars>
      {starsFromGrade.map(star => (
        <React.Fragment key={Math.random()}>
          {star}
        </React.Fragment>
      ))}
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
