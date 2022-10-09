import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Home} from './src/pages/Home';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
};

export default App;
