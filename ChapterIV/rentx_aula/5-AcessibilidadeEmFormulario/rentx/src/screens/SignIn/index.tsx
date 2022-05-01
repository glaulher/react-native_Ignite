import React from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, SubTitle, Title, Form, Footer } from './styles';

export function SignIn() {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />

            <PasswordInput iconName="lock" placeholder="Senha" />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Login');
              }}
              enabled={false}
              loading={false}
              color=""
            />

            <Button
              title="Criar conta gratuíta"
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Login');
              }}
              enabled={false}
              loading={false}
              color={theme.colors.background_secundary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
