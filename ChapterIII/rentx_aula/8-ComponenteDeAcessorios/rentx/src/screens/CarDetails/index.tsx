import React from 'react';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton
          color=""
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log('test');
          }}
        />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://pngpress.com/wp-content/uploads/2020/08/uploads_audi_audi_PNG1757.png',
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>
        <About>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus
          arcu tempus diam condimentum ullamcorper. Donec tempor neque ut
          vestibulum sollicitudin. Donec fringilla cursus sapien quis cursus.
          Fusce at mollis.
        </About>
      </Content>
    </Container>
  );
}
