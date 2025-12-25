import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import HomeScreen from './screens/Homescreen';
import ReportIssuePage from './pages/reportissue';
import KnowledgeBlogScreen from './screens/KnowledgeBlogScreen';

import BottomNavBar from './screens/BottomNavbar';
import  ProfileScreen from './screens/profilescreen';
import selectActivity from './screens/volunter';
import SignupScreen from './pages/signupform';
import LoginScreen from './pages/loginform';
import EventCards from './screens/annocument';
import Quiz from './screens/Quizscreen';

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Wrapper to include Bottom Navbar
const ScreenWithNavBar = ({ children }) => (
  <View style={{ flex: 1 }}>
    {children}
    <BottomNavBar />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* ✅ Home Screen with Bottom Navbar */}
        <Stack.Screen name="Home">
          {() => (
            <ScreenWithNavBar>
              <HomeScreen />
            </ScreenWithNavBar>
          )}
        </Stack.Screen>

        {/* ✅ Report Issue Page (without Bottom Navbar) */}
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
          name="EventCards"
          component={EventCards}
          options={{
            headerShown: true,
            title: 'Announcements',
            headerBackTitleVisible: false,
          }}
        />

        {/* ✅ Knowledge Blog Screen (without Bottom Navbar) */}
        <Stack.Screen
          name="KnowledgeBlogScreen"
          component={KnowledgeBlogScreen}
          options={{
            headerShown: true,
            title: 'Knowledge Blog',
            headerBackTitleVisible: false,
          }}
        />
         <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            title: 'Report Issue',
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="selectActivity"
          component={selectActivity}
          options={{
            headerShown: true,
            title: 'Volunteer',
            headerBackTitleVisible: false,
          }}
        />

        {/* ✅ Quiz Screen (without Bottom Navbar) */}
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerShown: true,
            title: 'Quiz',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
