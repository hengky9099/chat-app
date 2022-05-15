import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routes/Index';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './store/Index';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
