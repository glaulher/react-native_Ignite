import React from 'react';

import { Container, Header } from './styles';
import { BackButton } from '../../components/BackButton';

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
    </Container>
  );
}
