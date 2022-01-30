import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
  ButtonWrapper,
} from './styles';

import { Button } from '../../components/Button';

export function Scheduling() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <ButtonWrapper>
          <BackButton
            color={theme.colors.shape}
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log('test');
            }}
          />
        </ButtonWrapper>
        <Title>
          Escolha uma {'\n'} data de início e {'\n'} fim de aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content />

      <Footer>
        <Button color="" title="Confirmar" />
      </Footer>
    </Container>
  );
}
