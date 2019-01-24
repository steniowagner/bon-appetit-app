// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  align-items: center;
`;

const ControllerText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.defaultWhite};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const DotsWrapper = styled(View)`
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  flex-direction: row;
  position: absolute;
`;

const PaginationDot = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryColor : theme.colors.defaultWhite)};
`;

const ButtonsWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const renderDots = (numberOfDots: number, currentIndex: number): Object => {
  const dots = Array(numberOfDots).fill();

  return (
    <DotsWrapper>
      {dots.map((_, index) => (
        <PaginationDot
          isSelected={index === currentIndex}
          key={`DOT${index - 1}`}
        >
          {'\u2022'}
        </PaginationDot>
      ))}
    </DotsWrapper>
  );
};

type Props = {
  onPressRightButton: Function,
  onPressLeftButton: Function,
  numberOfDots: number,
  currentIndex: number,
  withSkip: ?boolean,
};

const BottomPagination = ({
  onPressRightButton,
  onPressLeftButton,
  numberOfDots,
  currentIndex,
  withSkip,
}: Props): Object => (
  <Container>
    {renderDots(numberOfDots, currentIndex)}
    <ButtonsWrapper>
      <TouchableOpacity
        onPress={onPressLeftButton}
      >
        <ControllerText>{withSkip ? 'SKIP' : 'PREV'}</ControllerText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRightButton}
      >
        <ControllerText>NEXT</ControllerText>
      </TouchableOpacity>
    </ButtonsWrapper>
  </Container>
);

export default BottomPagination;
