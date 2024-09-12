import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import AttendanceHistoryScreen from './screens/AttendanceHistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Attendance Tracker' }} />
          <Stack.Screen name="AddPerson" component={AddPersonScreen} options={{ title: 'Add New Person' }} />
          <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} options={{ title: 'Attendance History' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}