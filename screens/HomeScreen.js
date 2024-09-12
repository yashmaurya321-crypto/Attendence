import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { List, Button, FAB, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPeople = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@people');
      if (jsonValue != null) {
        const loadedPeople = JSON.parse(jsonValue);
        console.log('Loaded people:', loadedPeople); // Debugging line
        setPeople(loadedPeople);
      } else {
        console.log('No people data found in AsyncStorage'); // Debugging line
      }
    } catch (e) {
      console.error('Failed to load people:', e);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, [loadPeople])
  );

  const savePeople = async (newPeople) => {
    try {
      const jsonValue = JSON.stringify(newPeople);
      await AsyncStorage.setItem('@people', jsonValue);
    } catch (e) {
      console.error('Failed to save people:', e);
    }
  };

  const markAttendance = (id, status) => {
    const newPeople = people.map(person => {
      if (person.id === id) {
        const newAttendance = [...(person.attendance || [])];
        const existingIndex = newAttendance.findIndex(a => a.date === date.toISOString().split('T')[0]);
        if (existingIndex !== -1) {
          newAttendance[existingIndex].status = status;
        } else {
          newAttendance.push({ date: date.toISOString().split('T')[0], status });
        }
        return { ...person, attendance: newAttendance };
      }
      return person;
    });
    setPeople(newPeople);
    savePeople(newPeople);
  };

  const markAllAttendance = (status) => {
    const newPeople = people.map(person => {
      const newAttendance = [...(person.attendance || [])];
      const existingIndex = newAttendance.findIndex(a => a.date === date.toISOString().split('T')[0]);
      if (existingIndex !== -1) {
        newAttendance[existingIndex].status = status;
      } else {
        newAttendance.push({ date: date.toISOString().split('T')[0], status });
      }
      return { ...person, attendance: newAttendance };
    });
    setPeople(newPeople);
    savePeople(newPeople);
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const todayAttendance = item.attendance?.find(a => a.date === date.toISOString().split('T')[0]);
    return (
      <List.Item
        title={item.name}
        description={`Status: ${todayAttendance?.status || 'Not marked'}`}
        right={() => (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => markAttendance(item.id, 'Present')}>Present</Button>
            <Button onPress={() => markAttendance(item.id, 'Absent')}>Absent</Button>
          </View>
        )}
        onPress={() => navigation.navigate('AttendanceHistory', { personId: item.id })}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search people"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button onPress={() => setShowDatePicker(true)}>
        Select Date: {date.toDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <Button onPress={() => markAllAttendance('Present')}>Mark All Present</Button>
      <Button onPress={() => markAllAttendance('Absent')}>Mark All Absent</Button>
      <FlatList
        data={filteredPeople}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => navigation.navigate('AddPerson')}
      />
    </View>
  );
};

export default HomeScreen;