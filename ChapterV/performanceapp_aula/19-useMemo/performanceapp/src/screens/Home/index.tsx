import React, { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FriendLit } from '../../compnents/FriendList';

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://192.168.1.109:3333/friends?q=${name}`);
    const data = await response.json();
    setFriends(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        onChangeText={setName}
      />

      <Button title="Buscar" onPress={() => handleSearch()} />

      <ScrollView style={styles.list}>
        <FriendLit data={friends} />
      </ScrollView>
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
