import {
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

export default function px(size) {
  if (PixelRatio.get() >= 3 && Platform.OS === 'ios' && size === 1) {
    return size;
  }
  return deviceWidth / 750 * size;
}
