// @flow

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  colorShimmer: Array<string>,
  locationStart: number,
}

class CustomLinearGradient extends Component<Props, {}> {
  render() {
    const { locationStart, style } = this.props;

    return (
      <LinearGradient
        colors={['#ebebeb', '#c5c5c5', '#ebebeb']}
        style={{ ...style }}
        start={{ x: -1, y: 0.5 }}
        end={{ x: 2, y: 0.5 }}
        locations={[
          locationStart + 0.5,
          locationStart + 0.5 + (0.5 / 2),
          locationStart + 1,
        ]}
      />
    );
  }
}

export default CustomLinearGradient;
