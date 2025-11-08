import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import Box from '../../components/Box';
import TextApp from '../../components/TextApp';
import {responsiveFont, responsiveSpacing} from '../../utils/responsive';
import {Fonts} from '../../theme/fonts';
import ItemInput from './components/ItemInput';
import {useLogin} from './hooks/useLogin';
import ButtonText from '../../components/ButtonText';
import {Icons} from '../../assets/icons';

export default function Login() {
  const {form, onChange} = useLogin();
  return (
    <Container>
      <Box
        marginTop={responsiveSpacing(149)}
        paddingHorizontal={responsiveSpacing(16)}>
        <TextApp
          fontFamily={Fonts.Poppins_Medium}
          fontSize={responsiveFont(32)}>
          Sign In
        </TextApp>
        <ItemInput
          title="Email Address"
          value={form.email}
          onChangeText={text => onChange('email', text)}
        />
        <ItemInput
          title="Password"
          value={form.password}
          onChangeText={text => onChange('password', text)}
          isPassword
          iconLeft={Icons.IconLock}
        />
        <Box marginTop={responsiveSpacing(40)} alignItems="center">
          <ButtonText title="Sign in" onPress={() => {}} />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop={24}>
          <TextApp>I’m a new user . </TextApp>
          <TouchableOpacity>
            <TextApp color="#0066FF">Create an account</TextApp>
          </TouchableOpacity>
        </Box>
      </Box>
    </Container>
  );
}

const styles = StyleSheet.create({});
