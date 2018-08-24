import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';
import styled from 'styled-components';

import CustomLinearGradient from './CustomLinearGradient';

const Container = styled(View)`
  overflow: hidden;
  position: absolute;
`;

type Props = {
  style: any,
};

Animated.LinearGradient = Animated.createAnimatedComponent(CustomLinearGradient);

class Shimmer extends Component<Props, {}> {
  _startEffectPosition = new Animated.Value(-1);

  componentDidMount() {
    const shimmerAnimation = this.getShimmerAnimation();

    Animated.loop(
      shimmerAnimation,
    ).start();
  }

  getShimmerAnimation = () => {
    this._startEffectPosition.setValue(-1);

    const shimmerAnimation = Animated.timing(this._startEffectPosition, {
      toValue: 1,
      duration: 750,
    });

    return shimmerAnimation;
  }

  render() {
    const { style } = this.props;

    const animationStartPosition = this._startEffectPosition.interpolate({
      inputRange: [-1, 1],
      outputRange: [-0.5, 0.5],
    });

    return (
      <Container>
        <View style={{ ...style }}>
          <Animated.LinearGradient
            locationStart={animationStartPosition}
            style={style}
          />
        </View>
      </Container>
    );
  }
}

export default Shimmer;
