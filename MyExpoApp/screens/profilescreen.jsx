// import React, { useState, useEffect } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import {
//   Settings,
//   Edit3,
//   Award,
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Leaf,
//   Trash2,
//   Star,
//   TrendingUp,
//   Users,
//   Zap,
//   MapPin,
// } from 'lucide-react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const userStats = {
//   issuesRaised: 28,
//   issuesSolved: 19,
//   efficiency: 76,
//   avgResponse: '4h 12m',
// };

// const badges = [
//   { id: 1, title: 'Green Steward', icon: Leaf, color: '#00E6B8', description: 'Reported 10+ environmental issues' },
//   { id: 2, title: 'Quick Responder', icon: Zap, color: '#38BDF8', description: 'Avg response time < 6 hours' },
//   { id: 3, title: 'Community Builder', icon: Users, color: '#818CF8', description: 'Engaged with 50+ community members' },
//   { id: 4, title: 'Waste Warrior', icon: Trash2, color: '#F87171', description: 'Reported 20+ waste management issues' },
// ];

// const issues = [
//   { id: 1, type: 'single use plastic-waste', location: 'Ranchi - Main Road, Sector 6', description: 'huge amount of single use plastic covers piled upon each other' },
//   { id: 2, type: 'lump of waterbottles', location: 'Dhanbad - Zone 2', description: 'huge lump of water bottles found on the street' },
// ];

// const timeline = [
//   { id: 1, text: 'Reported pothole at Main Road', icon: AlertCircle },
//   { id: 2, text: 'Earned "Green Steward" badge', icon: Award },
//   { id: 3, text: 'Resolved street light issue', icon: CheckCircle },
// ];

// const ProfileScreen = () => {
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [xpProgress, setXpProgress] = useState(0);

//   useEffect(() => {
//     setTimeout(() => setXpProgress(73), 500);
//   }, []);

//   const TabButton = ({ icon: Icon, label, index }) => (
//     <TouchableOpacity
//       onPress={() => setSelectedTab(index)}
//       style={[styles.tabButton, selectedTab === index && styles.activeTabButton]}
//     >
//       <Icon size={20} color={selectedTab === index ? '#38BDF8' : '#94A3B8'} />
//       <Text style={[styles.tabButtonText, selectedTab === index && styles.activeTabButtonText]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>My Profile</Text>
//           <Settings size={22} color="#38BDF8" />
//         </View>

//         {/* Profile Info */}
//         <View style={styles.container}>
//           <Image
//             source={{ uri: 'https://i.pravatar.cc/300' }}
//             style={styles.avatar}
//           />
//           <Text style={styles.profileName}>John Doe</Text>
//           <Text style={styles.profileHandle}>Active Community Member</Text>
//           <View style={styles.locationPill}>
//             <MapPin size={14} color="#38BDF8" />
//             <Text style={styles.locationText}>Hyderabad, India</Text>
//           </View>
//           <TouchableOpacity style={styles.editProfileButton}>
//             <Edit3 size={16} color="#fff" />
//             <Text style={styles.editProfileText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Stats */}
//         <View style={styles.card}>
//           <View style={styles.statsGrid}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{userStats.issuesRaised}</Text>
//               <Text style={styles.statLabel}>Issues Raised</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{userStats.issuesSolved}</Text>
//               <Text style={styles.statLabel}>Issues Solved</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{userStats.efficiency}%</Text>
//               <Text style={styles.statLabel}>Efficiency</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{userStats.avgResponse}</Text>
//               <Text style={styles.statLabel}>Avg Response</Text>
//             </View>
//           </View>

//           <View style={styles.xpContainer}>
//             <Text style={styles.xpLabel}>XP Progress</Text>
//             <View style={styles.xpBarBackground}>
//               <LinearGradient
//                 colors={['#38BDF8', '#06B6D4']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={[styles.xpBar, { width: `${xpProgress}%` }]}
//               />
//             </View>
//           </View>
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabBar}>
//           <TabButton icon={FileText} label="My Issues" index={0} />
//           <TabButton icon={Award} label="Badges" index={1} />
//           <TabButton icon={Clock} label="Activity" index={2} />
//         </View>

//         {/* Tab Content */}
//         <View style={styles.contentContainer}>
//           {selectedTab === 0 && (
//             <>
//               {issues.map(issue => (
//                 <View key={issue.id} style={styles.issueCard}>
//                   <Text style={styles.issueTitle}>{issue.type}</Text>
//                   <Text style={styles.issueDesc}>{issue.description}</Text>
//                   <Text style={styles.issueLocation}>{issue.location}</Text>
//                 </View>
//               ))}
//             </>
//           )}

//           {selectedTab === 1 && (
//             <View style={styles.badgesGrid}>
//               {badges.map(badge => {
//                 const Icon = badge.icon;
//                 return (
//                   <View key={badge.id} style={styles.badgeCard}>
//                     <Icon size={24} color={badge.color} />
//                     <Text style={styles.badgeTitle}>{badge.title}</Text>
//                     <Text style={styles.badgeDesc}>{badge.description}</Text>
//                   </View>
//                 );
//               })}
//             </View>
//           )}

//           {selectedTab === 2 && (
//             <View>
//               {timeline.map(item => {
//                 const Icon = item.icon;
//                 return (
//                   <View key={item.id} style={styles.timelineItem}>
//                     <Icon size={16} color="#38BDF8" />
//                     <Text style={styles.timelineText}>{item.text}</Text>
//                   </View>
//                 );
//               })}
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0A192F' },
//   scrollContainer: { paddingBottom: 100 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
//   headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   container: { alignItems: 'center', marginTop: 10 },
//   avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#38BDF8' },
//   profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
//   profileHandle: { color: '#94A3B8', fontSize: 14 },
//   locationPill: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
//   locationText: { color: '#E2E8F0', marginLeft: 4 },
//   editProfileButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#38BDF8', padding: 8, borderRadius: 8, marginTop: 10 },
//   editProfileText: { color: '#fff', fontWeight: 'bold', marginLeft: 6 },
//   card: { backgroundColor: '#112240', borderRadius: 12, padding: 12, margin: 12 },
//   statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   statItem: { width: '48%', marginVertical: 6 },
//   statValue: { color: '#38BDF8', fontSize: 18, fontWeight: 'bold' },
//   statLabel: { color: '#E2E8F0', fontSize: 12 },
//   xpContainer: { marginTop: 12 },
//   xpLabel: { color: '#E2E8F0', fontSize: 12 },
//   xpBarBackground: { height: 6, backgroundColor: '#1E293B', borderRadius: 3, marginTop: 4 },
//   xpBar: { height: 6, borderRadius: 3 },
//   tabBar: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: '#1E293B', marginTop: 12 },
//   tabButton: { alignItems: 'center', paddingVertical: 8 },
//   tabButtonText: { color: '#94A3B8', fontSize: 12 },
//   activeTabButton: { borderBottomWidth: 2, borderBottomColor: '#38BDF8' },
//   activeTabButtonText: { color: '#38BDF8' },
//   contentContainer: { padding: 16 },
//   issueCard: { backgroundColor: '#112240', borderRadius: 12, padding: 12, marginBottom: 10 },
//   issueTitle: { color: '#38BDF8', fontSize: 14, fontWeight: 'bold' },
//   issueDesc: { color: '#E2E8F0', fontSize: 12, marginTop: 4 },
//   issueLocation: { color: '#94A3B8', fontSize: 10, marginTop: 4 },
//   badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   badgeCard: { backgroundColor: '#112240', borderRadius: 12, padding: 12, marginBottom: 10, width: '48%', alignItems: 'center' },
//   badgeTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
//   badgeDesc: { color: '#94A3B8', fontSize: 10, textAlign: 'center', marginTop: 2 },
//   timelineItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#112240', borderRadius: 10, padding: 10, marginBottom: 8 },
//   timelineText: { color: '#E2E8F0', fontSize: 12, marginLeft: 8 },
// });



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
  MapPin,
  ShoppingBag,
  Recycle,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const userStats = {
  plasticReduced: 42,
  issuesRaised: 28,
  bottlesRecycled: 156,
  avgImpact: '8.2kg CO₂',
};

const badges = [
  { id: 1, title: 'Plastic Warrior', icon: ShoppingBag, color: '#4CAF50', description: 'Reduced 50+ plastic bags usage' },
  { id: 2, title: 'Quick Recycler', icon: Recycle, color: '#66BB6A', description: 'Recycled 100+ plastic bottles' },
  { id: 3, title: 'Eco Champion', icon: Leaf, color: '#81C784', description: 'Engaged with 50+ eco initiatives' },
  { id: 4, title: 'Waste Reducer', icon: Trash2, color: '#A5D6A7', description: 'Reported 20+ plastic waste issues' },
];

const issues = [
  { id: 1, type: 'Single-use Plastic Waste', location: 'Ranchi - Main Road, Sector 6', description: 'Huge amount of single-use plastic covers piled upon each other near market area' },
  { id: 2, type: 'Plastic Bottle Lump', location: 'Dhanbad - Zone 2', description: 'Large accumulation of plastic water bottles found on the street corner' },
];

const timeline = [
  { id: 1, text: 'Reported plastic waste at Market Road', icon: AlertCircle },
  { id: 2, text: 'Earned "Plastic Warrior" badge', icon: Award },
  { id: 3, text: 'Recycled 50 plastic bottles', icon: CheckCircle },
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
      <Icon size={20} color={selectedTab === index ? '#4CAF50' : '#81C784'} />
      <Text style={[styles.tabButtonText, selectedTab === index && styles.activeTabButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Eco Profile</Text>
          <Settings size={24} color="#4CAF50" />
        </View>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: '' }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileHandle}>Eco Warrior & Plastic Reducer</Text>
          <View style={styles.locationPill}>
            <MapPin size={14} color="#4CAF50" />
            <Text style={styles.locationText}>Hyderabad, India</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit3 size={16} color="#fff" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌱 My Impact Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.plasticReduced}</Text>
              <Text style={styles.statLabel}>Plastic Items Reduced</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.issuesRaised}</Text>
              <Text style={styles.statLabel}>Issues Raised</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.bottlesRecycled}</Text>
              <Text style={styles.statLabel}>Bottles Recycled</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.avgImpact}</Text>
              <Text style={styles.statLabel}>CO₂ Saved</Text>
            </View>
          </View>

          <View style={styles.xpContainer}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>Eco Progress</Text>
              <Text style={styles.xpPercentage}>{xpProgress}%</Text>
            </View>
            <View style={styles.xpBarBackground}>
              <LinearGradient
                colors={['#4CAF50', '#66BB6A']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }}
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
                  <View style={styles.issueHeader}>
                    <AlertCircle size={18} color="#4CAF50" />
                    <Text style={styles.issueTitle}>{issue.type}</Text>
                  </View>
                  <Text style={styles.issueDesc}>{issue.description}</Text>
                  <View style={styles.issueLocationContainer}>
                    <MapPin size={12} color="#66BB6A" />
                    <Text style={styles.issueLocation}>{issue.location}</Text>
                  </View>
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
                    <View style={styles.badgeIconContainer}>
                      <Icon size={28} color={badge.color} />
                    </View>
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
                    <View style={styles.timelineIconContainer}>
                      <Icon size={18} color="#4CAF50" />
                    </View>
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
  safeArea: { 
    flex: 1, 
    backgroundColor: '#E8F5E9' 
  },
  scrollContainer: { 
    paddingBottom: 100 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: { 
    color: '#1B5E20', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  profileContainer: { 
    alignItems: 'center', 
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 4, 
    borderColor: '#4CAF50' 
  },
  profileName: { 
    color: '#1B5E20', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 12 
  },
  profileHandle: { 
    color: '#66BB6A', 
    fontSize: 14,
    marginTop: 4,
  },
  locationPill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: { 
    color: '#2E7D32', 
    marginLeft: 6,
    fontSize: 13,
  },
  editProfileButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 25, 
    marginTop: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editProfileText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 8,
    fontSize: 14,
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  statItem: { 
    width: '48%', 
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statValue: { 
    color: '#4CAF50', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  statLabel: { 
    color: '#2E7D32', 
    fontSize: 12,
    marginTop: 4,
  },
  xpContainer: { 
    marginTop: 16 
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: { 
    color: '#2E7D32', 
    fontSize: 13,
    fontWeight: '600',
  },
  xpPercentage: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: 'bold',
  },
  xpBarBackground: { 
    height: 8, 
    backgroundColor: '#C8E6C9', 
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBar: { 
    height: 8, 
    borderRadius: 4 
  },
  tabBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: { 
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabButtonText: { 
    color: '#66BB6A', 
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabButton: { 
    borderBottomWidth: 3, 
    borderBottomColor: '#4CAF50' 
  },
  activeTabButtonText: { 
    color: '#2E7D32',
    fontWeight: '700',
  },
  contentContainer: { 
    paddingHorizontal: 16 
  },
  issueCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueTitle: { 
    color: '#1B5E20', 
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: 8,
  },
  issueDesc: { 
    color: '#2E7D32', 
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  issueLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issueLocation: { 
    color: '#66BB6A', 
    fontSize: 12,
    marginLeft: 4,
  },
  badgesGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  badgeCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 12, 
    width: '48%', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeIconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  badgeTitle: { 
    color: '#1B5E20', 
    fontSize: 13, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDesc: { 
    color: '#66BB6A', 
    fontSize: 11, 
    textAlign: 'center',
    lineHeight: 15,
  },
  timelineItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineIconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 50,
  },
  timelineText: { 
    color: '#2E7D32', 
    fontSize: 13, 
    marginLeft: 12,
    flex: 1,
  },
}); 
    