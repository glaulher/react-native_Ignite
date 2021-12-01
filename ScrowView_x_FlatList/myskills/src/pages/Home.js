import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

const Home = () => {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Glaulher</Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      <Button onPress={handleAddNewSkill} />
      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      {/* Para listas grandes utilizar FlatList.
       * data={mySkills} Coleção de dados utilizados;
       * keyExtractor={item => item} extrai o id informando que o id é o próprio item
       *
       * renderItem={({item})=>(
       *   <SkillCard skill={item} key={item} /> // item que será renderizado
       * )}
       */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={mySkills}
        keyExtractor={item => item}
        renderItem={({item}) => <SkillCard skill={item} key={item} />}
      />

      {/*
       * utilizar ScrollView apenas em pequenas listas.
       */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {mySkills.map(skill => (
          <SkillCard skill={skill} key={skill} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 11,
    marginTop: 30,
    borderRadius: 7,
  },
});

export {Home};
