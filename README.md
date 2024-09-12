# Attendance Tracker App

A simple attendance tracking app built using React Native and Expo. It allows users to manage attendance for a list of people, store data locally using AsyncStorage, and view historical attendance records.

## Features

### Home Screen:
- Displays a list of people with their attendance status (Present/Absent) and the date.
- Options to mark all as "Present" or "Absent" for the day.
- Search functionality to find people quickly.
- Floating action button to add new people.

### Add New Person:
- Form to add a new person to the list.
- Input fields for name and ID.
- Validation to ensure that name and ID are not empty and the ID is unique.

### Attendance Marking:
- Mark each person’s status (Present/Absent) for the current date.
- Status is saved for specific dates.

### Attendance History:
- View the attendance history for each person by clicking on their name.
- Display records with dates and attendance statuses (Present/Absent).

### Persistent Storage:
- Attendance data is stored locally using AsyncStorage, so the data remains after the app is closed and reopened.

## Bonus Features (Optional)
- **Date Picker:** Allows selecting a date for marking attendance.
- **Push Notifications:** Remind users to mark attendance using React Native Push Notifications.

## Screens
- **Home Screen:** List of people with their attendance status and buttons to mark attendance.
- **Add Person Screen:** Form to add new people with name and ID fields.
- **Attendance History Screen:** Displays previous attendance records for a selected person.

## Tech Stack
- **Frontend:** React Native, Expo
- **State Management:** useState, useEffect, AsyncStorage for persistent local storage.
- **Navigation:** React Navigation for screen transitions.
- **UI Components:** React Native Paper for UI components like buttons, forms, and lists.
- **Local Storage:** AsyncStorage for saving and loading attendance data.

## Installation and Running the App
To run the app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/attendance-tracker-app.git
   cd attendance-tracker-app
2. Install dependencies:
    ```bash
   npm install
3. Start Expo :
    ```bash
   npx expo start --lan
4. Scan the QR code in the Expo Go app (available on both iOS and Android) to preview the app on your mobile device.

## Usage
- **Home Screen:**Displays the list of people with their attendance status. You can mark individual attendance or mark all as Present/Absent. Use the search bar to find specific people or select a date using the date picker.
- **Add New Person:**Navigate to the "Add Person" screen using the FAB (floating action button) on the home screen. Fill out the form and submit to add a new person to the list.
- **Attendance History:**Click on a person's name on the home screen to view their complete attendance history.

## Persistent Data
The app uses AsyncStorage to store attendance data locally, so the data will be saved even if the app is closed and reopened.

## Bonus Features
1. Date picker to choose the attendance date.
2. Search functionality to quickly find a person.

## Folder Structure

```bash
attendance-tracker/
├── screens/
│   ├── HomeScreen.js
│   ├── AddPersonScreen.js
│   ├── AttendanceHistoryScreen.js
├── App.js
├── package.json
└── README.md

## Dependencies

- `@react-native-async-storage/async-storage`: For persistent local storage.
- `@react-navigation/native`: For screen navigation.
- `@react-navigation/stack`: For stack navigation between screens.
- `react-native-paper`: For UI components like buttons, FAB, and text inputs.
- `@react-native-community/datetime`: For date and time pickers.



