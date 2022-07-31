import React from 'react';

import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Glaulher"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Medeiros"
      />

      <Button
        title="Salvar"
        onPress={() => {
          // eslint-disable-next-line no-console
          console.log('teste');
        }}
      />
    </View>
  );
}
