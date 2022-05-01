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
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
