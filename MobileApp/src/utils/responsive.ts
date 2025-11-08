import {Dimensions, Platform, PixelRatio, ScaledSize} from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;
let {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const updateBase = () => {
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  return {
    guidelineBaseWidth: isLandscape ? BASE_HEIGHT : BASE_WIDTH,
    guidelineBaseHeight: isLandscape ? BASE_WIDTH : BASE_HEIGHT,
  };
};

let {guidelineBaseWidth, guidelineBaseHeight} = updateBase();

export const scale = (size: number) =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

export const verticalScale = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsiveFont = (size: number) => moderateScale(size);
export const responsiveIcon = (size: number) => moderateScale(size, 0.7);
export const responsiveSpacing = (size: number) => moderateScale(size, 0.6);

export const isIpad =
  Platform.OS === 'ios' && (SCREEN_WIDTH >= 768 || SCREEN_HEIGHT >= 1024);

export const isSmallDevice = SCREEN_WIDTH < 360;
export const isTablet = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600;

export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  ratio: PixelRatio.get(),
  orientation: SCREEN_WIDTH > SCREEN_HEIGHT ? 'landscape' : 'portrait',
};

Dimensions.addEventListener('change', ({window}: {window: ScaledSize}) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
  SCREEN.width = SCREEN_WIDTH;
  SCREEN.height = SCREEN_HEIGHT;
  SCREEN.orientation = SCREEN_WIDTH > SCREEN_HEIGHT ? 'landscape' : 'portrait';

  const base = updateBase();
  guidelineBaseWidth = base.guidelineBaseWidth;
  guidelineBaseHeight = base.guidelineBaseHeight;
});
