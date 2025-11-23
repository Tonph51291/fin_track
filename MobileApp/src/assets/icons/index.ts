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
  IconHomeSelected: Platform.select({
    ios: 'icon_home_selected',
    android: 'asset:/icons/icon_home_seleted.png',
  }),
  IconHome: Platform.select({
    ios: 'icon_home',
    android: 'asset:/icons/icon_home.png',
  }),
  IconSettingSelected: Platform.select({
    ios: 'icon_setting_selected',
    android: 'asset:/icons/icon_setting_selected.png',
  }),
  IconSetting: Platform.select({
    ios: 'icon_setting',
    android: 'asset:/icons/icon_setting.png',
  }),
  IconMyCardSelected: Platform.select({
    ios: 'icon_my_card_selected',
    android: 'asset:/icons/icon_my_card_selected.png',
  }),
  IconMyCard: Platform.select({
    ios: 'icon_my_card',
    android: 'asset:/icons/icon_my_card.png',
  }),
  IconStaticSelected: Platform.select({
    ios: 'icon_static_selcetd',
    android: 'asset:/icons/icon_static_selcetd.png',
  }),
  IconStatic: Platform.select({
    ios: 'icon_static',
    android: 'asset:/icons/icon_static.png',
  }),
};
