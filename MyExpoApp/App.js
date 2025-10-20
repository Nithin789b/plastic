import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Homescreen';
// import AnnounceScreen from './screens/AnnounceScreen';
import ReportIssuePage from './pages/reportissue';
import KnowledgeBlogScreen from './screens/KnowledgeBlogScreen';
// import AlertsScreen from './screens/AlertsScreen';
// import ProfileScreen from './screens/ProfileScreen';

import BottomNavBar from './screens/BottomNavbar';

const Stack = createNativeStackNavigator();

// Wrapper to include bottom navbar
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
        {/* Screens with Bottom Nav */}
        <Stack.Screen name="Home">
          {() => <ScreenWithNavBar><HomeScreen /></ScreenWithNavBar>}
        </Stack.Screen>

        {/* Uncomment if you have this screen */}
        {/* <Stack.Screen name="Announce">
          {() => <ScreenWithNavBar><AnnounceScreen /></ScreenWithNavBar>}
        </Stack.Screen> */}

        {/* Screens without Bottom Nav */}
        <Stack.Screen
          name="ReportIssue"
          component={ReportIssuePage}
          options={{
            headerShown: true,
            title: 'Report Issue',
            headerBackTitleVisible: false,
          }}
        />
         <Stack.Screen
          name="KnowledgeBlogScreen"
          component={KnowledgeBlogScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
          }}
        />

        {/* <Stack.Screen name="Alerts">
          {() => <ScreenWithNavBar><AlertsScreen /></ScreenWithNavBar>}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {() => <ScreenWithNavBar><ProfileScreen /></ScreenWithNavBar>}
        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
