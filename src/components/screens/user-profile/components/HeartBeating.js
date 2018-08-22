// @flow

import React, { Component } from 'react';
import { View, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import style from 'styles';

const Wrapper = styled(View)`
  align-items: center;
  margin: 0 ${({ theme }) => theme.metrics.extraSmallSize}px;
  width: 30px;
`;

class HeartBeating extends Component {
  state = {
    heartSize: new Animated.Value(20),
  };

  componentDidMount() {
    this.beatHeart();
  }

  beatHeart = () => {
    const { heartSize } = this.state;

    Animated.loop(
      Animated.sequence([
        Animated.timing(heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 25,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 25,
          duration: 200,
        }),

        Animated.delay(700),
      ]),
    ).start();
  }

  render() {
    const { heartSize } = this.state;

    const HeartIcon = Animated.createAnimatedComponent(Icon);

    return (
      <Wrapper>
        <HeartIcon
          name="heart"
          style={{
            color: style.colors.red,
            fontSize: heartSize,
          }}
          size={heartSize}
        />
      </Wrapper>
    );
  }
}

export default HeartBeating;
