// Volunteer.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export default function Volunteer() {
  const [isInterested, setIsInterested] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!isInterested) {
      alert("Please confirm your interest first!");
      return;
    }
    alert("Thank you! Your response has been submitted.");
    navigation.navigate("Home");
  };

  const activities = [
    {
      title: "Cleanliness Drive",
      desc: "Help make our community cleaner and greener.",
      icon: "broom",
      color: "#FF6B6B",
    },
    {
      title: "Awareness Campaign",
      desc: "Spread the word about important local issues.",
      icon: "bullhorn",
      color: "#6C5CE7",
    },
    {
      title: "Plantation",
      desc: "Join us in planting trees for a better future.",
      icon: "seedling",
      color: "#00B894",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Question */}
        <View style={styles.questionWrap}>
          <Text style={styles.questionText}>
            In the future, are you interested in participating in these events?
          </Text>
        </View>

        {/* Activity Cards */}
        <View style={styles.cardsWrap}>
          {activities.map((item, index) => (
            <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
              <View style={styles.cardIconWrap}>
                <View style={styles.iconBg}>
                  <FontAwesome5 name={item.icon} size={28} color="#fff" />
                </View>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Checkbox Section */}
        <TouchableOpacity
          style={styles.checkboxWrap}
          onPress={() => setIsInterested(!isInterested)}
        >
          <View style={[styles.checkbox, isInterested && styles.checkboxChecked]}>
            {isInterested && <FontAwesome5 name="check" size={18} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Yes, I am interested</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  questionWrap: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },
  cardsWrap: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIconWrap: {
    marginRight: 16,
  },
  iconBg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: "#6C5CE7",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6C5CE7",
    borderColor: "#6C5CE7",
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
  submitButton: {
    backgroundColor: "#6C5CE7",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 0,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
