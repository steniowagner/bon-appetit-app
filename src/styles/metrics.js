import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  extraSmallPadding: 4,
  smallPadding: 8,
  mediumPadding: 12,
  largePadding: 16,
  extraIntermediateLargePadding: 24,
  extraLargePadding: 36,

  titleTextSize: width > 320 ? 22 : 20,
  descriptionTextSize: width > 320 ? 14 : 12,
  width,
  height,
};
