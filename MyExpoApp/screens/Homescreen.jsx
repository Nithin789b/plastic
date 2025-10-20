import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreenContent = ({ navigation }) => {  // Add navigation prop
  const menuItems = [
    {
      id: 1,
      title: 'Knowledge Blog',
      image: require('../assets/book.png'),
      backgroundColor: '#F5E6D3',
      screen: 'KnowledgeBlog',  // Add this
    },
    {
      id: 2,
      title: 'Quiz',
      image: require('../assets/quiz.png'),
      backgroundColor: '#E8DCC4',
      screen: 'Quiz',  // Add this
    },
    {
      id: 3,
      title: 'Photo Upload',
      image: require('../assets/photo-upload.png'),
      backgroundColor: '#F5E6D3',
      screen: 'PhotoUpload',  // Add this
    },
    {
      id: 4,
      title: 'Volunteer Registration',
      image: require('../assets/volunteer.png'),
      backgroundColor: '#E8DCC4',
      screen: 'Volunteer',  // Add this
    },
  ];

  const handleMenuPress = (item) => {
    if (item.screen === 'KnowledgeBlog') {
      navigation.navigate('KnowledgeBlog');
    } else {
      console.log(`${item.title} pressed - Coming soon!`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={28} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back, Alex!</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={18} color="#8E8E93" />
          <Text style={styles.locationText}>New York, USA</Text>
        </View>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.menuCard, { backgroundColor: item.backgroundColor }]}
            onPress={() => handleMenuPress(item)}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#F2F2F7',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  menuCard: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
});

export default HomeScreenContent;