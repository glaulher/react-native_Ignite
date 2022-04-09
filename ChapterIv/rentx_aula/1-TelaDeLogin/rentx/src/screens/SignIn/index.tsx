import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';

import { Container, Header, SubTitle, Title, Footer } from './styles';

export function SignIn() {
  const theme = useTheme();

  return (
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
  );
}
