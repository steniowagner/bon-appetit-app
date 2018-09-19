// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Slider,
} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const DistanceSlider = styled(Slider).attrs({
  maximumValue: 15,
  minimumValue: 1,
  step: 0.5,
  minimumTrackTintColor: ({ theme }) => theme.colors.primaryColor,
  thumbTintColor: ({ theme }) => theme.colors.primaryColor,
})``;

const CurrentDistanceText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.2%')}px;
  fontFamily: CircularStd-Black;
  text-align: center;
`;

const CurrentDistanceWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const DistanceBoundsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const DistanceBoundsText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')}px;
  fontFamily: CircularStd-Bold;
  text-align: center;
`;

type Props = {
  onChangeMaxDistance: Function,
  lastDistanceChosen: Function,
};

type State = {
  currentDistance: number,
};

class MaxDistanceFilter extends Component<Props, State> {
  state = {
    currentDistance: 1,
  };

  componentDidMount() {
    const { lastDistanceChosen } = this.props;

    this.setState({
      currentDistance: lastDistanceChosen,
    });

    this.sliderRef.setNativeProps({ value: lastDistanceChosen });
  }

  onSlideSlider = (value: number): void => {
    const { onChangeMaxDistance } = this.props;

    onChangeMaxDistance(value);

    this.setState({
      currentDistance: value,
    });
  }

  renderDistanceBounds = () => (
    <DistanceBoundsWrapper>
      <DistanceBoundsText>
        1 km
      </DistanceBoundsText>
      <DistanceBoundsText>
        15 km
      </DistanceBoundsText>
    </DistanceBoundsWrapper>
  )

  render() {
    const { currentDistance } = this.state;

    return (
      <Container>
        <CurrentDistanceWrapper>
          <CurrentDistanceText>
            {`${currentDistance} km`}
          </CurrentDistanceText>
        </CurrentDistanceWrapper>
        <DistanceSlider
          innerRef={(ref) => { this.sliderRef = ref; }}
          onValueChange={this.onSlideSlider}
        />
        {this.renderDistanceBounds()}
      </Container>
    );
  }
}

export default MaxDistanceFilter;
