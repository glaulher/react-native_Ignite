import { useRef } from 'react';
import { Container } from './styles';
import { Dimensions} from 'react-native';

import AnimatedLottieView from "lottie-react-native";

export function LoadAnimation() {
  const animation = useRef(null);
  //Get height window
  const { width } = Dimensions.get('window');
  return (
    <Container>
      <AnimatedLottieView 
        ref={animation} 
        source={require('../../assets/loadCar.json')} 
        autoPlay 
        loop 
        style={{width: width}}
        resizeMode="contain"
      />
    </Container>
  );
}