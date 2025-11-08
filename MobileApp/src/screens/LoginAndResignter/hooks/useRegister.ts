import {useCallback, useState} from 'react';

export const useRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = useCallback(
    (key: keyof typeof form, value: string | null) => {
      setForm(prev => ({
        ...prev,
        [key]: value ?? '',
      }));
    },
    [],
  );

  return {form, setForm, onChange};
};
