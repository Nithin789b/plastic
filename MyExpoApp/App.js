import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import HomeScreen from './screens/Homescreen';
import ReportIssuePage from './pages/reportissue';
import KnowledgeBlogScreen from './screens/KnowledgeBlogScreen';
import PlasticAwarenessPuzzle from './screens/Quizscreen';
import BottomNavBar from './screens/BottomNavbar';
import  ProfileScreen from './screens/profilescreen';
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
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

        {/* ✅ Plastic Awareness Puzzle Screen (without Bottom Navbar) */}
        <Stack.Screen
          name="PlasticAwarenessPuzzle"
          component={PlasticAwarenessPuzzle}
          options={{
            headerShown: true,
            title: '',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
