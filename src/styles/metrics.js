import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  extraSmallPadding: 4,
  smallPadding: 8,
  mediumPadding: 12,
  largePadding: 16,
  extraLargePadding: 36,
  width,
  height,
};
