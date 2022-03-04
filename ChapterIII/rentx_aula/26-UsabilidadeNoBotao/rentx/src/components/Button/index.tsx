import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color: string;
  enabled: boolean;
}

export function Button({ title, color, enabled = true, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
      color={color || theme.colors.main}
    >
      <Title>{title}</Title>
    </Container>
  );
}
