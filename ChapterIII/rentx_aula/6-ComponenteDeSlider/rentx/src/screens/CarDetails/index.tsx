import React from 'react';

import { Container, Header, CarImages } from './styles';
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
    </Container>
  );
}
