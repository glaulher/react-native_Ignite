import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet } from "react-native";
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";


import { 
  Container, 
  Header, 
  CarImages, 
  Details, 
  Description, 
  Brand, 
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer
} from './styles';

interface Params{
  car: CarDTO;
}

export function CarDetails(props) {
  const route = useRoute();
  const { car } = route.params as Params;
  //Theme
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return{
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return{
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  });

  function handleConfirmRental() {
    props.navigation.navigate('scheduling', {
      car
    });    
  }

  function handleBack() {
    props.navigation.goBack();
  }

  return (
    <Container>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor='transparent'
        />
        <Animated.View
          style={[
            headerStyleAnimation, 
            styles.header,
            {backgroundColor: theme.colors.background_secondary}
          ]}
        >
          <Header>
            <BackButton onPress={handleBack} />            
          </Header>
          <Animated.View
            style={sliderCarsStyleAnimation}
          >
            <CarImages>
              <ImageSlider 
                imagesUrl={car.photos} 
              />
            </CarImages>
          </Animated.View>
        </Animated.View>


      <Animated.ScrollView
        contentContainerStyle={{           
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
            alignItems: 'center',            
         }}
         showsVerticalScrollIndicator={false}
         onScroll={scrollHandler}
         scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        
        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }        
        </Acessories>

        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>

      </Animated.ScrollView>
      <Footer>
        <Button title='Escolher periodo do aluguel' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 99,
  },
});