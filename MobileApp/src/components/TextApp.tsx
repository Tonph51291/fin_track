import React from 'react';
import {Text, TextStyle, StyleProp} from 'react-native';
import {responsiveFont} from '../utils/responsive';
import {Fonts} from '../theme/fonts';

interface TextAppProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  fontFamily?: string;
  numberOfLines?: number;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  rotate?: number;
  bold?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

const TextApp: React.FC<TextAppProps> = ({
  children,
  style,
  color = '#1E1E2D',
  fontSize = responsiveFont(14),
  fontWeight = 'normal',
  textAlign = 'left',
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  fontFamily = Fonts.Poppins_Regular,
  numberOfLines,
  textTransform = 'none',
  rotate = 0,
  bold = false,
  ellipsizeMode = 'tail',
  textAlignVertical = 'auto',
}) => {
  console.log('render text');
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        {
          color,
          fontSize,
          fontWeight: bold ? 'bold' : fontWeight,
          textAlign,
          textAlignVertical,
          textTransform,
          margin,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          padding,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          fontFamily,
          transform: [{rotate: `${rotate}deg`}],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextApp;
