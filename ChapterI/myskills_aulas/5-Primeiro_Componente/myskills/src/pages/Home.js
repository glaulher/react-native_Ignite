import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,  
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

      <Button />

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      {mySkills.map(skill => (
        <SkillCard />
      ))}
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
