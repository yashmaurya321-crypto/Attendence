import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendanceHistoryScreen = ({ route }) => {
  const { personId } = route.params;
  const [person, setPerson] = useState(null);

  useEffect(() => {
    loadPerson();
  }, []);

  const loadPerson = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@people');
      if (jsonValue != null) {
        const people = JSON.parse(jsonValue);
        const foundPerson = people.find(p => p.id === personId);
        setPerson(foundPerson);
      }
    } catch (e) {
      console.error('Failed to load person:', e);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={`Date: ${item.date}`}
      description={`Status: ${item.status}`}
    />
  );

  if (!person) return null;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Title>{person.name}'s Attendance History</Title>
      <FlatList
        data={person.attendance.sort((a, b) => new Date(b.date) - new Date(a.date))}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
    </View>
  );
};

export default AttendanceHistoryScreen;