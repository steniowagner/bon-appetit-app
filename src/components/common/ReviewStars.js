// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyle from 'styles';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Reviews = styled(Text)`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme, isSmall }) => {
    const percentage = (isSmall ? '1.8%' : '2%');
    return theme.metrics.getHeightFromDP(percentage);
  }};
  fontFamily: CircularStd-Book;
`;

const WrapperStars = styled(View)`
  flex-direction: row;
`;

const getStars = (stars: number, small: ?boolean): Array<Object> => {
  const MAX_GRADE = 5;
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  const iconSize = small ? 12 : 16;

  const FullStar = <Icon name="star" size={iconSize} color={appStyle.colors.yellow} />;
  const HalfStar = <Icon name="star-half" size={iconSize} color={appStyle.colors.yellow} />;
  const EmptyStar = <Icon name="star-outline" size={iconSize} color={appStyle.colors.yellow} />;

  let currentStars = stars;

  if (currentStars >= MAX_GRADE) {
    for (let i = 0; i < MAX_GRADE; i++) {
      starsFromGrade.push(FullStar);
    }

    return starsFromGrade;
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

const renderStars = (grade: number, theme: ?boolean): Object => {
  const starsFromGrade = getStars(grade, theme);

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
  small: ?boolean,
  stars: number,
};

const ReviewStars = ({
  stars,
  shouldShowReviewsText,
  reviews,
  textColor,
  small,
} : Props) => (
  <Wrapper>
    {renderStars(stars, small)}
    {shouldShowReviewsText
      && (
      <Reviews
        isSmall={small}
        textColor={textColor}
      >
        {`${reviews} ${reviews > 1 ? 'Reviews' : 'Review'}`}
      </Reviews>)}
  </Wrapper>
);

export default ReviewStars;
