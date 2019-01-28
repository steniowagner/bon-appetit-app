// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

import appStyles from '~/styles';

const ForegroundLayer = styled(View)`
  background-color: ${({ theme }) => theme.colors.progressiveImageForeground};
  border-radius: ${({ theme, withBorder }) => (withBorder ? theme.metrics.borderRadius : 0)}px;
`;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  imageOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

type Props = {
  thumbnailImageURL: string,
  withBorder: ?boolean,
  imageURL: string,
};

class ProgressiveImage extends Component<Props, {}> {
  _thumbnailOpacity = new Animated.Value(0);
  _imageOpacity = new Animated.Value(0);

  onThumbnailLoaded = () => {
    Animated.timing(this._thumbnailOpacity, {
      toValue: 1,
    }).start();
  };

  onImageLoaded = () => {
    Animated.timing(this._imageOpacity, {
      toValue: 1,
    }).start();
  };

  render() {
    const { thumbnailImageURL, withBorder, imageURL } = this.props;

    return (
      <ForegroundLayer
        withBorder={withBorder}
      >
        <Animated.Image
          style={[
            styles.container,
            {
              borderRadius: withBorder ? appStyles.metrics.borderRadius : 0,
              opacity: this._thumbnailOpacity,
            },
          ]}
          source={{ uri: thumbnailImageURL }}
          onLoad={this.onThumbnailLoaded}
          blurRadius={1}
          resize="cover"
        />
        <Animated.Image
          style={[
            styles.imageOverlay,
            {
              borderRadius: withBorder ? appStyles.metrics.borderRadius : 0,
              opacity: this._imageOpacity,
            },
            styles.container,
          ]}
          onLoad={this.onImageLoaded}
          source={{ uri: imageURL }}
          resize="cover"
        />
      </ForegroundLayer>
    );
  }
}

export default ProgressiveImage;
