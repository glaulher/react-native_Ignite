import React, { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  /* ***********************************************
   * Efeito de sobreposição do logo utilizando     *
   * interpolate, código comentado.                *
   *********************************************** */

  // const brandStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(
  //       splashAnimation.value,
  //       [0, 25, 50],
  //       [1, 0.3, 0],
  //       Extrapolate.CLAMP,
  //     ),
  //   };
  // });

  // const LogoStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(
  //       splashAnimation.value,
  //       [0, 25, 50],
  //       [0, 0.3, 1],
  //       Extrapolate.CLAMP,
  //     ),
  //   };
  // });

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const LogoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={80} />
      </Animated.View>

      <Animated.View style={[LogoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
