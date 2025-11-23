import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  SCREEN,
  verticalScale,
} from '../utils/responsive';
import {Icons} from '../assets/icons';
import Box from '../components/Box';
import TextApp from '../components/TextApp';
import {Colors} from '../theme/color';

const getIconByRoute = (name: string, focused: boolean) => {
  switch (name) {
    case 'Home':
      return focused ? Icons.IconHomeSelected : Icons.IconHome;
    case 'My Card':
      return focused ? Icons.IconMyCardSelected : Icons.IconMyCard;
    case 'Statistics':
      return focused ? Icons.IconStaticSelected : Icons.IconStatic;
    case 'Setting':
      return focused ? Icons.IconSettingSelected : Icons.IconSetting;
    default:
      return Icons.IconHome;
  }
};

export default function CustomTabar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <Box
      style={styles.container}
      borderTopWidth={moderateScale(1)}
      width={SCREEN.width}
      height={verticalScale(70)}
      flexDirection="row"
      backgroundColor={'#F4F4F4'}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon = getIconByRoute(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}>
            <Image
              source={{uri: icon}}
              style={isFocused ? styles.iconSelected : styles.icon}
            />
            {isFocused && (
              <TextApp fontSize={responsiveFont(12)} color={Colors.blue500}>
                {route.name}
              </TextApp>
            )}
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    flex: 1,
  },
  icon: {
    width: responsiveIcon(24),
    height: responsiveIcon(24),
  },
  iconSelected: {
    width: responsiveIcon(24),
    height: responsiveIcon(24),
  },
});
