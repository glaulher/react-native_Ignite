import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransactional,
} from './styles';

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransactional>Última entrada dia 13 de abril</LastTransactional>
      </Footer>
    </Container>
  );
}
