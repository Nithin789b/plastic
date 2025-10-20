import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavBar = ({ activeTab = 'Home' }) => {
  const tabs = [
    { name: 'Home', icon: 'home', iconOutline: 'home-outline' },
    { name: 'Announce', icon: 'megaphone', iconOutline: 'megaphone-outline' },
    { name: 'Upload', icon: 'image', iconOutline: 'image-outline' },
    { name: 'Alerts', icon: 'notifications', iconOutline: 'notifications-outline' },
    { name: 'Profile', icon: 'person-circle', iconOutline: 'person-circle-outline' }
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity 
            key={tab.name} 
            style={styles.tabItem}
            onPress={() => console.log(`${tab.name} pressed`)}
          >
            <Ionicons 
              name={isActive ? tab.icon : tab.iconOutline} 
              size={26} 
              color={isActive ? '#00A8E8' : '#8E8E93'} 
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#00A8E8',
    fontWeight: '600',
  },
});

export default BottomNavBar;
