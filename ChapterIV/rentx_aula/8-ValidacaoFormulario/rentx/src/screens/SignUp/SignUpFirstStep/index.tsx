import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
  Container,
  Header,
  ButtonWrapper,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <ButtonWrapper>
          <BackButton color="" onPress={() => handleBack()} />
        </ButtonWrapper>
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>

      <Title>Crie sua{'\n'}conta</Title>
      <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}
