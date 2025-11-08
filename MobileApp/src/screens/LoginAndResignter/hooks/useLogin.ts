import {useCallback, useState} from 'react';

export const useLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
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
