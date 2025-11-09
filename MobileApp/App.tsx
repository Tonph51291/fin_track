import React from 'react';
import TabScreen from './src/navigation/TabScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {AlertProvider} from './src/context/AlertContext';

export default function App() {
  return (
    <AlertProvider>
      <Provider store={store}>
        <TabScreen />
      </Provider>
    </AlertProvider>
  );
}
