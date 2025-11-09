import React, {createContext, useContext, useState, ReactNode} from 'react';
import {CustomAlert} from '../components/CustomAlert';

interface AlertOptions {
  title?: string;
  message: string;
  okText?: string;
}

interface AlertContextProps {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({message: ''});

  const showAlert = (opts: AlertOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideAlert = () => setVisible(false);

  return (
    <AlertContext.Provider value={{showAlert}}>
      {children}
      <CustomAlert
        visible={visible}
        title={options.title}
        message={options.message}
        okText={options.okText}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useGlobalAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error('useGlobalAlert must be used within AlertProvider');
  return context;
};
