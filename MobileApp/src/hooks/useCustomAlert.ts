import {useState, useCallback} from 'react';

interface AlertOptions {
  title?: string;
  message: string;
  okText?: string;
}

export const useCustomAlert = () => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({message: ''});

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => setVisible(false), []);

  return {visible, options, showAlert, hideAlert};
};
