import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import HomeScreenContent from './screens/Homescreen';
import BottomNavBar from './screens/BottomNavbar';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeScreenContent />
      </View>
      <BottomNavBar activeTab="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
});

export default App;
