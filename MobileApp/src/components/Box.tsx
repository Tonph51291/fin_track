import {StyleProp, View, ViewStyle} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {Colors} from '../theme/color';
interface BoxProps {
  children?: ReactNode;
  flex?: number;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  opacity?: number;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  reverse?: boolean;
  row?: boolean;
  center?: boolean;
  position?: 'absolute' | 'relative' | undefined;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  height?: number | string;
  width?: number | string;
  size?: number;
  maxHeight?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  radius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderWidth?: number;
  borderColor?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  style?: StyleProp<ViewStyle>;
  zIndex?: number;
}
const Box = (props: BoxProps) => {
  const {
    children,
    flex,
    alignItems,
    backgroundColor,
    opacity,
    style,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    padding,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    radius,
    flexDirection,
    borderWidth,
    borderColor,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    marginVertical,
    marginHorizontal,
    alignSelf,
    justifyContent,
    position = undefined,
    top = null,
    right = null,
    bottom = null,
    left = null,
    zIndex,
    overflow,
  } = props;
  return (
    <View
      style={[
        style,
        {
          flex: flex ?? 0,
          flexDirection: flexDirection ?? 'column',
          alignItems: alignItems ?? undefined,
          backgroundColor: backgroundColor ?? undefined,
          opacity: opacity ?? 1,
          margin: margin ?? null,
          marginBottom: marginBottom ?? null,
          marginTop: marginTop ?? null,
          marginLeft: marginLeft ?? null,
          marginRight: marginRight ?? null,
          padding: padding ?? null,
          paddingBottom: paddingBottom ?? null,
          paddingTop: paddingTop ?? null,
          paddingLeft: paddingLeft ?? null,
          paddingRight: paddingRight ?? null,
          paddingHorizontal: paddingHorizontal ?? null,
          paddingVertical: paddingVertical ?? null,
          borderRadius: radius ?? 0,
          borderWidth: borderWidth ?? 0,
          borderTopWidth: borderTopWidth ?? 0,
          borderBottomWidth: borderBottomWidth ?? 0,
          borderLeftWidth: borderLeftWidth ?? 0,
          borderRightWidth: borderRightWidth ?? 0,
          borderTopColor: borderTopColor ?? Colors.white,
          borderBottomColor: borderBottomColor ?? Colors.white,
          borderLeftColor: borderLeftColor ?? Colors.white,
          borderRightColor: borderRightColor ?? Colors.white,
          borderColor: borderColor ?? Colors.white,
          marginHorizontal: marginHorizontal ?? 0,
          marginVertical: marginVertical ?? 0,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? undefined,
          position: position,
          top,
          right,
          left,
          bottom,
          zIndex: zIndex ?? 0,
          overflow: overflow ?? undefined,
        },
      ]}>
      {children}
    </View>
  );
};

export default memo(Box);
