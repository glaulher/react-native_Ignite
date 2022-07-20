import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

// type Props = TextInputProps;

interface Props extends TextInputProps {
  // eslint-disable-next-line react/require-default-props
  active?: boolean;
}

export function Input({ active = false, ...rest }: Props) {
  return <Container active={active} {...rest} />;
}
