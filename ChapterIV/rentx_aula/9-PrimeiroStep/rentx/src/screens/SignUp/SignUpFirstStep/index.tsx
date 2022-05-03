import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

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
  const [email, setEmail] = useState('');
  const [cnh, setCnh] = useState('');

  function handleBack() {
    navigation.goBack();
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numbers-and-punctuation"
              autoCorrect={false}
              onChangeText={setCnh}
              value={cnh}
            />
          </Form>

          <Button
            title="próximo"
            // eslint-disable-next-line no-console
            onPress={() => console.log()}
            enabled
            loading={false}
            color=""
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
