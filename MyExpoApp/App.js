import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Homescreen';
// import AnnounceScreen from './screens/AnnounceScreen';
// import UploadScreen from './screens/UploadScreen';
// import AlertsScreen from './screens/AlertsScreen';
// import ProfileScreen from './screens/ProfileScreen';
import BottomNavBar from './screens/BottomNavbar';

const Stack = createNativeStackNavigator();

const ScreenWithNavBar = ({ children }) => (
  <View style={{ flex: 1 }}>
    {children}
    <BottomNavBar />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {() => <ScreenWithNavBar><HomeScreen /></ScreenWithNavBar>}
        </Stack.Screen>
        <Stack.Screen name="Announce">
          {() => <ScreenWithNavBar><AnnounceScreen /></ScreenWithNavBar>}
        </Stack.Screen>
        <Stack.Screen name="Upload">
          {() => <ScreenWithNavBar><UploadScreen /></ScreenWithNavBar>}
        </Stack.Screen>
        <Stack.Screen name="Alerts">
          {() => <ScreenWithNavBar><AlertsScreen /></ScreenWithNavBar>}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {() => <ScreenWithNavBar><ProfileScreen /></ScreenWithNavBar>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
