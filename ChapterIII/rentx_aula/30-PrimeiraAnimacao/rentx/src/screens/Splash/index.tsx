import React from 'react';
import { Button, StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Container } from './styles';

export function Splash() {
  let soma = 0;
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });

  function handleAnimationPosition() {
    soma += 100;
    animation.value = soma;
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Mover" onPress={() => handleAnimationPosition()} />
    </Container>
  );
}
const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
