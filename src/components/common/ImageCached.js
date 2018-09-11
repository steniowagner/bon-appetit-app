// @flow

import React, { Component } from 'react';
import { Animated, Platform } from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import CacheManager from 'components/utils/CacheManager';

const FILE_PREFIX = Platform.OS === 'ios' ? '' : 'file://';

const Pic = styled(Animated.Image).attrs({
  source: ({ uri }) => ({ uri: FILE_PREFIX + uri }),
})`
  height: 100%;
  width: 100%;
  resizeMode: cover;
  position: absolute;
  border-radius: ${({ border }) => border}px;
`;

type Props = {
  uri: string,
  border?: string,
};

type State = {
  imageURI: string,
};

class ImageCached extends Component<Props, State> {
  state = {
    imageURI: '',
  };

  async componentDidMount() {
    const { uri } = this.props;

    const imageURI = await CacheManager.getItemFromCache(uri, 'images', 'jpg');

    this.setState({
      imageURI,
    });
  }

  render() {
    const { imageURI } = this.state;
    const { border } = this.props;

    return (
      !!imageURI && (
        <Pic
          uri={imageURI}
          border={border}
        />
      )
    );
  }
}

ImageCached.defaultProps = {
  border: appStyles.metrics.borderRadius,
};

export default ImageCached;
