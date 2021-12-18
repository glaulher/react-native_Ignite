import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextInputProps } from 'react-native';
import { Container } from './styles';
import { Input } from '../Input';

interface Props extends TextInputProps {
  control: Control;
  name: string;
}
/*  onChange quando muda o conteúdo input muda
 *  onBlur quando acessa o input
 *  value é o valor do input
 */
export function InputForm({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
        name={name}
      />
    </Container>
  );
}
