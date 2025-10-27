import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Track completion status
  const [completionStatus, setCompletionStatus] = useState({
    knowledgeBlog: false,
    quiz: false,
    reportIssue: false,
  });

  // Load completion status on mount
  useEffect(() => {
    loadCompletionStatus();
  }, []);

  // Add listener to refresh status when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCompletionStatus();
    });
    return unsubscribe;
  }, [navigation]);

  const loadCompletionStatus = async () => {
    try {
      const knowledgeBlog = await AsyncStorage.getItem('knowledgeBlog_completed');
      const quiz = await AsyncStorage.getItem('quiz_completed');
      const reportIssue = await AsyncStorage.getItem('reportIssue_completed');

      setCompletionStatus({
        knowledgeBlog: knowledgeBlog === 'true',
        quiz: quiz === 'true',
        reportIssue: reportIssue === 'true',
      });
    } catch (error) {
      console.error('Error loading completion status:', error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Knowledge Blog',
      image: require('../assets/book.png'),
      backgroundColor: '#F5E6D3',
      navigateTo: 'KnowledgeBlogScreen',
      statusKey: 'knowledgeBlog',
    },
    {
      id: 2,
      title: 'Quiz',
      image: require('../assets/quiz.png'),
      backgroundColor: '#E8DCC4',
      navigateTo: 'Quiz',
      statusKey: 'quiz',
    },
    {
      id: 3,
      title: 'Report Issue',
      image: require('../assets/photo-upload.png'),
      backgroundColor: '#F5E6D3',
      navigateTo: 'ReportIssue',
      statusKey: 'reportIssue',
    },
    {
      id: 4,
      title: 'Volunteer Registration',
      image: require('../assets/volunteer.png'),
      backgroundColor: '#E8DCC4',
      navigateTo: 'selectActivity',
    },
  ];

  // Calculate progress
  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const totalRequired = 3;
  const progressPercentage = (completedCount / totalRequired) * 100;
  const allCompleted = completedCount === totalRequired;

  const handleGetCertificate = () => {
    if (allCompleted) {
      navigation.navigate('Certificate'); // Navigate to certificate screen
    } else {
      Alert.alert(
        'Complete All Activities',
        'Please complete Knowledge Blog, Quiz, and Report Issue to get your certificate!',
        [{ text: 'OK' }]
      );
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
          <Text style={styles.locationText}>Bhimavaram, Andhra Pradesh</Text>
        </View>
      </View>

      {/* Progress Card */}
     
      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.menuCard, { backgroundColor: item.backgroundColor }]}
            onPress={() => {
              if (item.navigateTo) {
                navigation.navigate(item.navigateTo);
              } else {
                console.log(`${item.title} pressed`);
              }
            }}
          >
            {/* Completion Badge */}
            {item.statusKey && completionStatus[item.statusKey] && (
              <View style={styles.completionBadge}>
                <Ionicons name="checkmark" size={16} color="#FFF" />
              </View>
            )}
            
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
    marginBottom: 20,
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
  progressCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  checklistContainer: {
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 12,
  },
  checklistTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  certificateButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  certificateButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
  },
  certificateIcon: {
    marginRight: 8,
  },
  certificateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  certificateButtonTextDisabled: {
    color: '#8E8E93',
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
    position: 'relative',
  },
  completionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    textAlign: 'center',
  },
});

export default HomeScreen;