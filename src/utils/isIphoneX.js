// @flow

import { Dimensions, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IPHONEX_WIDTH = 375;
const IPHONEX_HEIGHT = 812;

const isIphoneX = (): boolean => {
  const isIphoneXInPortraitMode = screenHeight === IPHONEX_HEIGHT && screenWidth === IPHONEX_WIDTH;
  const isIphoneXInLandscapeMode = screenHeight === IPHONEX_WIDTH && screenWidth === IPHONEX_HEIGHT;

  return (
    Platform.OS === 'ios'
    && (isIphoneXInPortraitMode || isIphoneXInLandscapeMode)
  );
};

export default isIphoneX;
