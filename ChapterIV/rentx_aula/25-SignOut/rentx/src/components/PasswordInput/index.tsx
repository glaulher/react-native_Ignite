import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
  ContainerWrapper,
  Line,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value: string;
  // eslint-disable-next-line react/require-default-props
  accessibilityRole?: undefined;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <ContainerWrapper>
        <IconContainer>
          <Feather
            name={iconName}
            size={24}
            color={
              isFocused || isFilled
                ? theme.colors.main
                : theme.colors.text_detail
            }
          />
        </IconContainer>
        <InputText
          autoCorrect={false}
          secureTextEntry={isPasswordVisible}
          onFocus={() => handleInputFocus()}
          onBlur={() => handleInputBlur()}
          {...rest}
        />

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
      </ContainerWrapper>
      <Line isFocused={isFocused} />
    </Container>
  );
}
