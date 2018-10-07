// @flow

import React from 'react';
import {
  Slider,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const DistanceSlider = styled(Slider).attrs({
  minimumTrackTintColor: ({ theme }) => theme.colors.primaryColor,
  thumbTintColor: ({ theme }) => theme.colors.primaryColor,
  maximumValue: 15,
  minimumValue: 1,
  step: 0.5,
})``;

const CurrentDistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  fontFamily: CircularStd-Black;
`;

const CurrentDistanceWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const DistanceBoundsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const DistanceBoundsText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  fontFamily: CircularStd-Bold;
  text-align: center;
`;

type Props = {
  onChangeDistance: Function,
  currentDistance: number,
};

let sliderRef;

const renderDistanceBounds = (): Object => (
  <DistanceBoundsWrapper>
    <DistanceBoundsText>
      1 km
    </DistanceBoundsText>
    <DistanceBoundsText>
      15 km
    </DistanceBoundsText>
  </DistanceBoundsWrapper>
);

const MaxDistanceFilter = ({
  onChangeDistance,
  currentDistance,
}: Props): Object => (
  <Container>
    <CurrentDistanceWrapper>
      <CurrentDistanceText>
        {`${currentDistance} km`}
      </CurrentDistanceText>
    </CurrentDistanceWrapper>
    <DistanceSlider
      onLayout={() => sliderRef.setNativeProps({ value: currentDistance })}
      onValueChange={distance => onChangeDistance(distance)}
      innerRef={(ref) => { sliderRef = ref; }}
    />
    {renderDistanceBounds()}
  </Container>
);

export default MaxDistanceFilter;
