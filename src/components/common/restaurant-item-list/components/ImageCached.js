import React, { Component } from 'react';
import { Image } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components';

const SHA1 = require('crypto-js/sha1');

const Pic = styled(Image).attrs({
  source: ({ uri }) => ({ uri }),
})`
  resizeMode: center;
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

    const imageURI = await this.getImage(uri);

    this.setState({
      imageURI,
    });
  }

  getImage = async (uri) => {
    const directoryPath = `${RNFetchBlob.fs.dirs.DocumentDir}/bon_appetit`;
    const fileName = `${SHA1(uri)}'.jpg'`;
    const pathToFile = `${directoryPath}/${fileName}`;

    const isImageAlreadyCached = await this.verifyResourceAlreadyExists(pathToFile);

    if (isImageAlreadyCached) {
      return pathToFile;
    }

    const isDirectoryAlreadyCreated = await this.verifyResourceAlreadyExists(pathToFile);

    if (isDirectoryAlreadyCreated) {
      await RNFetchBlob.fs.mkdir(directoryPath);
    }

    const result = await RNFetchBlob.config({ path: pathToFile, trusty: true }).fetch('GET', uri);

    const { respInfo, data } = result;

    if (respInfo.status === 200) {
      return data;
    }

    return '';
  }

  verifyResourceAlreadyExists = async (pathToImage) => {
    const imageAlreadyExists = await RNFetchBlob.fs.exists(pathToImage);

    return imageAlreadyExists;
  }

  render() {
    const { imageURI } = this.state;

    return (
      !!imageURI && <Pic uri={imageURI} />
    );
  }
}

export default ImageCached;
