import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../../components/Container';
import Box from '../../components/Box';
import TextApp from '../../components/TextApp';
import {responsiveFont, responsiveSpacing} from '../../utils/responsive';
import {Fonts} from '../../theme/fonts';
import ItemInput from './components/ItemInput';
import {useLogin} from './hooks/useLogin';
import ButtonText from '../../components/ButtonText';
import {Icons} from '../../assets/icons';
import {loginThunk} from '../../store/slices/authSlices';
import {useAppDispatch} from '../../store';
import {useGlobalAlert} from '../../context/AlertContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/route';

export default function Login() {
  const {form, onChange, showPassword, setShowPassword} = useLogin();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {showAlert} = useGlobalAlert();

  const dispatch = useAppDispatch();
  const handleNavigateToHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);
  const handleLogin = useCallback(async () => {
    if (!form.email.trim()) {
      showAlert({message: 'Email không được để trống'});
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showAlert({message: 'Email không hợp lệ'});
      return;
    }

    if (!form.password) {
      showAlert({message: 'Mật khẩu không được để trống'});
      return;
    }

    if (form.password.length < 6) {
      showAlert({message: 'Mật khẩu phải từ 6 ký tự trở lên'});
      return;
    }
    try {
      const response = await dispatch(loginThunk(form)).unwrap();
      // await EncryptedStorage.setItem(
      //   'user_session',
      //   JSON.stringify({
      //     token: response.token,
      //     expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      //   })
      // );
      handleNavigateToHome();
    } catch (err: any) {
      console.log('err', err);
      showAlert({message: err.message || 'Đăng nhập thất bại'});
    }
  }, [form, dispatch, showAlert, handleNavigateToHome]);

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);
  const handleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, [setShowPassword]);

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
          isShowPassword={!showPassword}
          onPressIconLeft={handleShowPassword}
          iconLeft={Icons.IconLock}
        />
        <Box marginTop={responsiveSpacing(40)} alignItems="center">
          <ButtonText title="Sign in" onPress={handleLogin} />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop={24}>
          <TextApp>I’m a new user . </TextApp>
          <TouchableOpacity onPress={handleNavigateToRegister}>
            <TextApp color="#0066FF">Create an account</TextApp>
          </TouchableOpacity>
        </Box>
      </Box>
    </Container>
  );
}

const styles = StyleSheet.create({});
