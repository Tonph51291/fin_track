import React from 'react';
import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../theme/color';
interface Props {
  children?: React.ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
}

const Container: React.FC<Props> = ({children, style, useSafeArea = true}) => {
  const Wrapper = useSafeArea ? SafeAreaView : View;

  return <Wrapper style={[styles.overlay, style]}>{children}</Wrapper>;
};

export default Container;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
