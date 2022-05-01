import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText secureTextEntry={isPasswordVisible} {...rest} />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePasswordVisibilityChange()}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  );
}
