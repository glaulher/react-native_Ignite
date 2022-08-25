import React, { useCallback, useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';

import { FriendLit } from '../../compnents/FriendList';

interface Data {
  id: string;
  name: string;
  likes: number;
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://192.168.1.103:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
    });

    setFriends(formattedData);
  };

  const handleFollow = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('follow user');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        onChangeText={setName}
      />

      <Button title="Buscar" onPress={() => handleSearch()} />
      <View style={styles.list}>
        <FriendLit data={friends} follow={() => handleFollow()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  },
});
