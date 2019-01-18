// @flow

import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import shorthash from 'shorthash';

const BASE_DIRECTORY_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/bon_appetit`;
const FILE_PREFIX = Platform.OS === 'ios' ? '' : 'file://';

const verifyResourceAlreadyExists = async (path: string): any => {
  const resourceAlreadyExists = await RNFetchBlob.fs.exists(path);

  return resourceAlreadyExists;
};

const getItemFromCache = async (
  uri: string,
  folder: string = 'images',
  fileExtension: string = 'jpg',
): any => {
  const fileName = `${shorthash.unique(uri)}`;
  const fileDirectory = `${BASE_DIRECTORY_PATH}/${folder}`;
  const pathToFile = `${fileDirectory}/${fileName}.${fileExtension}`;

  const isResourceAlreadyCached = await verifyResourceAlreadyExists(pathToFile);

  if (isResourceAlreadyCached) {
    return pathToFile;
  }

  const isDirectoryAlreadyCreated = await verifyResourceAlreadyExists(
    fileDirectory,
  );

  if (!isDirectoryAlreadyCreated) {
    await RNFetchBlob.fs.mkdir(fileDirectory);
  }

  const result = await RNFetchBlob.config({
    path: pathToFile,
    appendExt: fileExtension,
    trusty: true,
  }).fetch('GET', uri);

  const { respInfo, data } = result;

  if (respInfo.status === 200) {
    return FILE_PREFIX + data;
  }

  return '';
};

export default {
  getItemFromCache,
};
