import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavBar = ({ activeTab: propActiveTab }) => {
  let navigation = null;
  let route = null;
  try {
    navigation = useNavigation();
    route = useRoute();
  } catch (e) {
    navigation = null;
    route = null;
  }

  const activeTab = propActiveTab ?? route?.name;

  const tabs = [
    { name: 'Home', icon: 'home', iconOutline: 'home-outline', screen: 'Home' },
    { name: 'Announce', icon: 'megaphone', iconOutline: 'megaphone-outline', screen: 'Announce' },
    { name: 'Upload', icon: 'image', iconOutline: 'image-outline', screen: 'Upload' },
    { name: 'Alerts', icon: 'notifications', iconOutline: 'notifications-outline', screen: 'Alerts' },
    { name: 'Profile', icon: 'person-circle', iconOutline: 'person-circle-outline', screen: 'Profile' }
  ];

  const handlePress = (tab) => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate(tab.screen);
    } else {
      console.log(`${tab.name} pressed (no navigation available)`);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.screen || activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => handlePress(tab)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
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