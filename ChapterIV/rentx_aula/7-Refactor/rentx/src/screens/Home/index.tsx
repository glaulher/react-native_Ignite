import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEnd(event, ctx: any) {
      positionX.value = withSpring(ctx.positionX + event.translationX - 10);
      positionY.value = withSpring(ctx.positionY + event.translationY - 10);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={() => handleOpenMyCars()}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
