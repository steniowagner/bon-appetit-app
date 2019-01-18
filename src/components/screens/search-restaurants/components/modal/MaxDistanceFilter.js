// @flow

import React from 'react';
import { Slider, Text, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '~/styles';

const Container = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const CurrentDistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  font-family: CircularStd-Black;
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
  font-family: CircularStd-Bold;
  text-align: center;
`;

type Props = {
  onChangeDistance: Function,
  currentDistance: number,
};

let sliderRef: Object;

const renderDistanceBounds = (): Object => (
  <DistanceBoundsWrapper>
    <DistanceBoundsText>1 km</DistanceBoundsText>
    <DistanceBoundsText>15 km</DistanceBoundsText>
  </DistanceBoundsWrapper>
);

const MaxDistanceFilter = ({
  onChangeDistance,
  currentDistance,
}: Props): Object => (
  <Container>
    <CurrentDistanceWrapper>
      <CurrentDistanceText>{`${currentDistance} km`}</CurrentDistanceText>
    </CurrentDistanceWrapper>
    <Slider
      onLayout={() => sliderRef.setNativeProps({ value: currentDistance })}
      onValueChange={distance => onChangeDistance(distance)}
      ref={(ref) => {
        sliderRef = ref;
      }}
      minimumTrackTintColor={appStyles.colors.primaryColor}
      thumbTintColor={appStyles.colors.primaryColor}
      maximumValue={15}
      minimumValue={1}
      step={0.5}
    />
    {renderDistanceBounds()}
  </Container>
);

export default MaxDistanceFilter;
