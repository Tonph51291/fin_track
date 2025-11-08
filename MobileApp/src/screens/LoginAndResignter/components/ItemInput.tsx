import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Box from '../../../components/Box';
import TextApp from '../../../components/TextApp';
import IconApp from '../../../components/IconApp';
import {Icons} from '../../../assets/icons';
import {Colors} from '../../../theme/color';

interface ItemInputProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  iconLeft?: string;
}
const ItemInput = ({
  title,
  value,
  onChangeText,
  isPassword = false,
  iconLeft = Icons.IconEmail,
}: ItemInputProps) => {
  return (
    <Box borderColor={Colors.lightGray} marginTop={24} borderBottomWidth={1}>
      <TextApp>{title}</TextApp>
      <Box flexDirection="row">
        <IconApp source={iconLeft} disabled />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
        />
        {isPassword && <IconApp source={Icons.IconEye} />}
      </Box>
    </Box>
  );
};

export default React.memo(ItemInput);

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
