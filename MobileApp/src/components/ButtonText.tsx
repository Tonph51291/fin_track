import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../theme/color';
import {moderateScale, scale} from '../utils/responsive';
import TextApp from './TextApp';
import {Fonts} from '../theme/fonts';

interface ButtonTextProps {
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  height?: number;
  width?: number;
}

const ButtonText = ({
  title,
  onPress,
  height = scale(56),
  width = scale(335),
  backgroundColor = Colors.blue500,
}: ButtonTextProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height,
        width,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(16),
      }}>
      <TextApp color={Colors.white} fontFamily={Fonts.Poppins_Bold}>
        {title}
      </TextApp>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonText);

const styles = StyleSheet.create({});
