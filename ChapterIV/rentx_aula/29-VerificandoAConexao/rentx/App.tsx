import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

import {
  // useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

// import ignoreWarnings from 'ignore-warnings';
import { Routes } from './src/routes';

import theme from './src/styles/theme';
import { AppProvider } from './src/hooks';

export default function App() {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
    // 'NativeBase: The contrast ratio of',
    // "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  // ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // const [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   Inter_500Medium,
  //   Archivo_400Regular,
  //   Archivo_500Medium,
  //   Archivo_600SemiBold,
  // });

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          Inter_400Regular,
          Inter_500Medium,
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // if (!fontsLoaded) return <AppLoading />;
  if (!isLoadingComplete) {
    return isLoadingComplete;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
