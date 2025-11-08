import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import {responsiveIcon} from '../utils/responsive';

interface IconAppProps {
  source: any;
  size?: number;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
  disabled?: boolean;
  width?: number;
  height?: number;
}

const IconApp: React.FC<IconAppProps> = ({
  source,
  size = responsiveIcon(24),
  onPress,
  style,
  iconStyle,
  disabled = false,
  width,
  height,
}) => {
  const iconWidth = width ?? size;
  const iconHeight = height ?? size;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.container, style]}>
      <Image
        source={typeof source === 'string' ? {uri: source} : source}
        style={[
          {
            width: iconWidth,
            height: iconHeight,
          },
          iconStyle,
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconApp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
