import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  Settings,
  Edit3,
  Award,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Leaf,
  Trash2,
  Star,
  TrendingUp,
  Users,
  Zap,
  MapPin,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const userStats = {
  issuesRaised: 28,
  issuesSolved: 19,
  efficiency: 76,
  avgResponse: '4h 12m',
};

const badges = [
  { id: 1, title: 'Green Steward', icon: Leaf, color: '#00E6B8', description: 'Reported 10+ environmental issues' },
  { id: 2, title: 'Quick Responder', icon: Zap, color: '#38BDF8', description: 'Avg response time < 6 hours' },
  { id: 3, title: 'Community Builder', icon: Users, color: '#818CF8', description: 'Engaged with 50+ community members' },
  { id: 4, title: 'Waste Warrior', icon: Trash2, color: '#F87171', description: 'Reported 20+ waste management issues' },
];

const issues = [
  { id: 1, type: 'Pothole Repair', location: 'Ranchi - Main Road, Sector 6', description: 'Large pothole causing traffic issues' },
  { id: 2, type: 'Street Light', location: 'Dhanbad - Zone 2', description: 'Street lights not working' },
];

const timeline = [
  { id: 1, text: 'Reported pothole at Main Road', icon: AlertCircle },
  { id: 2, text: 'Earned "Green Steward" badge', icon: Award },
  { id: 3, text: 'Resolved street light issue', icon: CheckCircle },
];

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [xpProgress, setXpProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setXpProgress(73), 500);
  }, []);

  const TabButton = ({ icon: Icon, label, index }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(index)}
      style={[styles.tabButton, selectedTab === index && styles.activeTabButton]}
    >
      <Icon size={20} color={selectedTab === index ? '#38BDF8' : '#94A3B8'} />
      <Text style={[styles.tabButtonText, selectedTab === index && styles.activeTabButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Settings size={22} color="#38BDF8" />
        </View>

        {/* Profile Info */}
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileHandle}>Active Community Member</Text>
          <View style={styles.locationPill}>
            <MapPin size={14} color="#38BDF8" />
            <Text style={styles.locationText}>Hyderabad, India</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit3 size={16} color="#fff" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.issuesRaised}</Text>
              <Text style={styles.statLabel}>Issues Raised</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.issuesSolved}</Text>
              <Text style={styles.statLabel}>Issues Solved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.efficiency}%</Text>
              <Text style={styles.statLabel}>Efficiency</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.avgResponse}</Text>
              <Text style={styles.statLabel}>Avg Response</Text>
            </View>
          </View>

          <View style={styles.xpContainer}>
            <Text style={styles.xpLabel}>XP Progress</Text>
            <View style={styles.xpBarBackground}>
              <LinearGradient
                colors={['#38BDF8', '#06B6D4']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.xpBar, { width: `${xpProgress}%` }]}
              />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          <TabButton icon={FileText} label="My Issues" index={0} />
          <TabButton icon={Award} label="Badges" index={1} />
          <TabButton icon={Clock} label="Activity" index={2} />
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {selectedTab === 0 && (
            <>
              {issues.map(issue => (
                <View key={issue.id} style={styles.issueCard}>
                  <Text style={styles.issueTitle}>{issue.type}</Text>
                  <Text style={styles.issueDesc}>{issue.description}</Text>
                  <Text style={styles.issueLocation}>{issue.location}</Text>
                </View>
              ))}
            </>
          )}

          {selectedTab === 1 && (
            <View style={styles.badgesGrid}>
              {badges.map(badge => {
                const Icon = badge.icon;
                return (
                  <View key={badge.id} style={styles.badgeCard}>
                    <Icon size={24} color={badge.color} />
                    <Text style={styles.badgeTitle}>{badge.title}</Text>
                    <Text style={styles.badgeDesc}>{badge.description}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {selectedTab === 2 && (
            <View>
              {timeline.map(item => {
                const Icon = item.icon;
                return (
                  <View key={item.id} style={styles.timelineItem}>
                    <Icon size={16} color="#38BDF8" />
                    <Text style={styles.timelineText}>{item.text}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A192F' },
  scrollContainer: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  container: { alignItems: 'center', marginTop: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#38BDF8' },
  profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  profileHandle: { color: '#94A3B8', fontSize: 14 },
  locationPill: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locationText: { color: '#E2E8F0', marginLeft: 4 },
  editProfileButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#38BDF8', padding: 8, borderRadius: 8, marginTop: 10 },
  editProfileText: { color: '#fff', fontWeight: 'bold', marginLeft: 6 },
  card: { backgroundColor: '#112240', borderRadius: 12, padding: 12, margin: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statItem: { width: '48%', marginVertical: 6 },
  statValue: { color: '#38BDF8', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#E2E8F0', fontSize: 12 },
  xpContainer: { marginTop: 12 },
  xpLabel: { color: '#E2E8F0', fontSize: 12 },
  xpBarBackground: { height: 6, backgroundColor: '#1E293B', borderRadius: 3, marginTop: 4 },
  xpBar: { height: 6, borderRadius: 3 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: '#1E293B', marginTop: 12 },
  tabButton: { alignItems: 'center', paddingVertical: 8 },
  tabButtonText: { color: '#94A3B8', fontSize: 12 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: '#38BDF8' },
  activeTabButtonText: { color: '#38BDF8' },
  contentContainer: { padding: 16 },
  issueCard: { backgroundColor: '#112240', borderRadius: 12, padding: 12, marginBottom: 10 },
  issueTitle: { color: '#38BDF8', fontSize: 14, fontWeight: 'bold' },
  issueDesc: { color: '#E2E8F0', fontSize: 12, marginTop: 4 },
  issueLocation: { color: '#94A3B8', fontSize: 10, marginTop: 4 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  badgeCard: { backgroundColor: '#112240', borderRadius: 12, padding: 12, marginBottom: 10, width: '48%', alignItems: 'center' },
  badgeTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  badgeDesc: { color: '#94A3B8', fontSize: 10, textAlign: 'center', marginTop: 2 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderRadius: 10, padding: 10, marginBottom: 8 },
  timelineText: { color: '#E2E8F0', fontSize: 12, marginLeft: 8 },
});

