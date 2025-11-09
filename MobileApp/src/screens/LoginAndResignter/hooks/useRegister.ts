import {useCallback, useState} from 'react';
import {useGlobalAlert} from '../../../context/AlertContext';
import {authApi} from '../../../api/authApi';

export const useRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const {showAlert} = useGlobalAlert();

  const onChange = useCallback(
    (key: keyof typeof form, value: string | null) => {
      setForm(prev => ({
        ...prev,
        [key]: value ?? '',
      }));
    },
    [],
  );

  const handleRegister = useCallback(async () => {
    // Validate
    if (!form.name.trim()) {
      return showAlert({message: 'Name không được để trống'});
    }

    if (!form.email.trim()) {
      return showAlert({message: 'Email không được để trống'});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return showAlert({message: 'Email không hợp lệ'});
    }

    if (!form.password) {
      return showAlert({message: 'Password không được để trống'});
    }
    if (form.password.length < 6) {
      return showAlert({message: 'Password phải từ 6 ký tự trở lên'});
    }

    if (form.password !== form.confirmPassword) {
      return showAlert({message: 'Confirm password không khớp'});
    }

    try {
      setLoading(true);
      const response = await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      showAlert({message: 'Đăng ký thành công!'});
      setForm({name: '', email: '', password: '', confirmPassword: ''});
    } catch (err: any) {
      showAlert({message: err.message || 'Đăng ký thất bại'});
    } finally {
      setLoading(false);
    }
  }, [form, showAlert]);

  return {form, onChange, handleRegister, loading};
};
