import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import styled from 'styled-components';

import CacheManager from 'components/utils/CacheManager';

const FILE_PREFIX = Platform.OS === 'ios' ? '' : 'file://';

const Pic = styled(Image).attrs({
  source: ({ uri }) => ({ uri: FILE_PREFIX + uri }),
})`
  resizeMode: cover;
  position: absolute;
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

class ImageCached extends Component {
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

    return (
      !!imageURI && <Pic uri={imageURI} />
    );
  }
}

export default ImageCached;
