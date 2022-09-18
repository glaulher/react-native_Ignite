import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/hooks/auth';

import { Routes } from './src/routes';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // const [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  //   Poppins_500Medium,
  //   Poppins_700Bold,
  // });
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
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

  const { userStorageLoading } = useAuth();

  // if (!isLoadingComplete || userStorageLoading) {
  //   return isLoadingComplete;
  // }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        {!isLoadingComplete || userStorageLoading ? (
          isLoadingComplete
        ) : (
          <Routes />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
