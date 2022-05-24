import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routes/Index';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store, Persistor} from './store/Index';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={Persistor}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
