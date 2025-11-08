import {Platform} from 'react-native';

export const Icons = {
  IconEmail: Platform.select({
    ios: 'icon_email',
    android: 'asset:/icons/icon_email.png',
  }),
  IconEye: Platform.select({
    ios: 'icon_eye',
    android: 'asset:/icons/icon_eye.png',
  }),
  IconLock: Platform.select({
    ios: 'icon_lock',
    android: 'asset:/icons/icon_lock.png',
  }),
};
