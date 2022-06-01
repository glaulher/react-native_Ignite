import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSingOut() {
    // eslint-disable-next-line no-console
    console.log('#');
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={() => handleBack()}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={() => handleSingOut()}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: 'https://github.com/glaulher.png' }} />
              <PhotoButton onPress={() => handleSingOut()}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>

              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>
            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />

                <Input
                  iconName="mail"
                  defaultValue={user.email}
                  editable={false}
                />

                <Input
                  iconName="credit-card"
                  defaultValue={user.driver_license}
                  placeholder="CNH"
                  keyboardType="numeric"
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  value=""
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="Nova atual"
                  value=""
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir atual"
                  value=""
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
