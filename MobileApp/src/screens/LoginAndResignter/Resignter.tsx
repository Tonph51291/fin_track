import {TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import Box from '../../components/Box';
import TextApp from '../../components/TextApp';
import {responsiveFont, responsiveSpacing} from '../../utils/responsive';
import {Fonts} from '../../theme/fonts';
import ItemInput from './components/ItemInput';
import ButtonText from '../../components/ButtonText';
import {Icons} from '../../assets/icons';
import {useRegister} from './hooks/useRegister';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/route';

export default function Register() {
  const {form, onChange, handleRegister, loading} = useRegister();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleNavigateToLogin = () => {
    navigation.goBack();
  };
  return (
    <Container>
      <Box
        marginTop={responsiveSpacing(149)}
        paddingHorizontal={responsiveSpacing(16)}>
        <TextApp
          fontFamily={Fonts.Poppins_Medium}
          fontSize={responsiveFont(32)}>
          Sign Up
        </TextApp>

        <ItemInput
          title="Name"
          value={form.name}
          onChangeText={text => onChange('name', text)}
        />
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
        <ItemInput
          title="Confirm Password"
          value={form.confirmPassword}
          onChangeText={text => onChange('confirmPassword', text)}
          isPassword
          iconLeft={Icons.IconLock}
        />

        <Box marginTop={responsiveSpacing(40)} alignItems="center">
          <ButtonText
            title={loading ? '' : 'Sign Up'}
            onPress={handleRegister}
          />
        </Box>

        <Box flexDirection="row" justifyContent="center" marginTop={24}>
          <TextApp>Already have an account? </TextApp>
          <TouchableOpacity onPress={handleNavigateToLogin}>
            <TextApp color="#0066FF">Sign In</TextApp>
          </TouchableOpacity>
        </Box>
      </Box>
    </Container>
  );
}
