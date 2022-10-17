import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Home} from './src/pages/Home';
import SplashScreen from 'react-native-splash-screen';
import CodePush from 'react-native-code-push';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://730a65f39b3e4778b46eb9eb8d6dd36f@o4504000696745984.ingest.sentry.io/4504000701464579',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

const App = () => {
  useEffect(() => {
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
    });

    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
