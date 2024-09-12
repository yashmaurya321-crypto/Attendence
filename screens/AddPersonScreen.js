import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPersonScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const addPerson = async () => {
    if (!name || !id) {
      setError('Name and ID are required');
      return;
    }

    try {
      const jsonValue = await AsyncStorage.getItem('@people');
      let people = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (people.some(person => person.id === id)) {
        setError('ID must be unique');
        return;
      }

      people.push({ id, name, attendance: [] });
      await AsyncStorage.setItem('@people', JSON.stringify(people));
      console.log('Added new person:', { id, name }); // Debugging line
      navigation.goBack();
    } catch (e) {
      console.error('Failed to add person:', e);
      setError('Failed to add person. Please try again.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <TextInput
        label="ID"
        value={id}
        onChangeText={setId}
        mode="outlined"
        style={{ marginTop: 10 }}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={addPerson} style={{ marginTop: 20 }}>
        Add Person
      </Button>
    </View>
  );
};

export default AddPersonScreen;