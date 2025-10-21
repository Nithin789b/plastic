// Volunteer.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = Math.min(400, width - 40);

const selectActivity = (activityName) => {
  Alert.alert(
    `You selected: ${activityName}.`,
    "Next, you would be taken to its registration form."
  );
};

export default function Volunteer() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.mobileContainer, { width: CONTAINER_WIDTH }]}>
        {/* Status bar mimic */}
        <View style={styles.statusBar}>
          <Text style={styles.statusBarTime}>9:42</Text>
          <View style={styles.statusIcons}>
            <FontAwesome5 name="signal" size={16} />
            <FontAwesome5 name="wifi" size={16} style={styles.iconSpacing} />
            <FontAwesome5 name="battery-full" size={16} style={styles.iconSpacing} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => Alert.alert("Back button clicked")}>
              <FontAwesome5 name="arrow-left" size={20} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Volunteer</Text>
          </View>

          {/* Subtitle */}
          <View style={styles.subtitleWrap}>
            <Text style={styles.subtitleTitle}>Choose an Activity</Text>
            <Text style={styles.subtitleText}>Select an event you'd like to participate in.</Text>
          </View>

          {/* Activity Cards */}
          <View style={styles.cardsWrap}>
            {/* Cleanliness Drive */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.card, styles.cardClean]}
              onPress={() => selectActivity("Cleanliness Drive")}
            >
              <View style={styles.cardIconWrap}>
                <View style={styles.iconBg}><FontAwesome5 name="broom" size={26} /></View>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Cleanliness Drive</Text>
                <Text style={styles.cardDesc}>Help make our community cleaner and greener.</Text>
              </View>
            </TouchableOpacity>

            {/* Awareness Campaign */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.card, styles.cardAwareness]}
              onPress={() => selectActivity("Awareness Campaign")}
            >
              <View style={styles.cardIconWrap}>
                <View style={styles.iconBg}><FontAwesome5 name="bullhorn" size={26} /></View>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Awareness Campaign</Text>
                <Text style={styles.cardDesc}>Spread the word about important local issues.</Text>
              </View>
            </TouchableOpacity>

            {/* Plantation */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.card, styles.cardPlant]}
              onPress={() => selectActivity("Plantation")}
            >
              <View style={styles.cardIconWrap}>
                <View style={styles.iconBg}><FontAwesome5 name="seedling" size={26} /></View>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Plantation</Text>
                <Text style={styles.cardDesc}>Join us in planting trees for a better future.</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  mobileContainer: {
    height: 820,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 32,
    backgroundColor: "#f2f2f7",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  statusBar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBarTime: {
    fontWeight: "600",
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 8,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  backIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },

  subtitleWrap: {
    marginBottom: 24,
  },
  subtitleTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  subtitleText: {
    color: "#6b7280",
    marginTop: 6,
  },

  cardsWrap: {
    gap: 18, // Android might ignore gap; controls spacing below with margin
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 18,
  },

  cardClean: {
    backgroundColor: "#F5E6D3",
  },
  cardAwareness: {
    backgroundColor: "#E8DCC4",
  },
  cardPlant: {
    backgroundColor: "#D4EFDF",
  },

  cardIconWrap: {
    marginRight: 14,
  },
  iconBg: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  cardDesc: {
    color: "#4b5563",
    marginTop: 4,
  },
});
