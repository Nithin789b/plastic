import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CertificateScreen = () => {
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState("Plastic Awareness Course");
  const [completionDate, setCompletionDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [showCertificate, setShowCertificate] = useState(false);

  const handleGenerateCertificate = () => {
    if (!userName.trim()) {
      Alert.alert("Enter Your Name", "Please enter your full name first.");
      return;
    }
    setShowCertificate(true);
  };

  const handleDownload = () => {
    Alert.alert("Saved!", "This will save the certificate to your gallery.");
  };

  const handleShare = () => {
    Alert.alert("Share", "This will open the native share dialog.");
  };

  const handleReset = () => {
    setShowCertificate(false);
    setUserName("");
  };

  const certificateId = `ECO-${Date.now().toString().slice(-8)}`;

  if (!showCertificate) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🎓 Generate Your Certificate</Text>
          <Text style={styles.subtitle}>
            Congratulations on completing the course!
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Your Full Name *</Text>
          <TextInput
            placeholder="Enter your full name"
            value={userName}
            onChangeText={setUserName}
            style={styles.input}
          />

          <Text style={styles.label}>Course Name</Text>
          <TextInput
            placeholder="Course Name"
            value={courseName}
            onChangeText={setCourseName}
            style={styles.input}
          />

          <Text style={styles.label}>Completion Date</Text>
          <TextInput
            placeholder="Completion Date"
            value={completionDate}
            onChangeText={setCompletionDate}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateCertificate}
          >
            <Text style={styles.generateButtonText}>🎖 Generate Certificate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewBox}>
          <Text style={styles.previewTitle}>✨ Preview Features:</Text>
          <Text style={styles.previewItem}>• Professional design</Text>
          <Text style={styles.previewItem}>• Download to gallery</Text>
          <Text style={styles.previewItem}>• Share certificate</Text>
          <Text style={styles.previewItem}>• Save offline</Text>
        </View>
      </ScrollView>
    );
  }

  // Certificate Preview Screen
  return (
    <ScrollView style={styles.certificateContainer}>
      <View style={styles.certificateCard}>
        <ImageBackground
          source={require("../assets/certificate-bg.png")} // optional background
          resizeMode="cover"
          style={styles.certificateBackground}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.certificateContent}>
            <Text style={styles.certificateHeader}>🏆 CERTIFICATE</Text>
            <Text style={styles.certificateSubHeader}>OF COMPLETION</Text>

            <View style={styles.divider} />

            <Text style={styles.smallText}>This is to certify that</Text>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.smallText}>has successfully completed</Text>

            <Text style={styles.courseName}>{courseName}</Text>

            <Text style={styles.tagline}>
              🌿 Excellence in Environmental Education 🌿
            </Text>

            <View style={styles.footerRow}>
              <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Date of Completion</Text>
                <Text style={styles.footerValue}>{completionDate}</Text>
              </View>

              <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Authorized Signature</Text>
                <Text style={styles.footerValue}>Environmental Academy</Text>
              </View>
            </View>

            <Text style={styles.certificateId}>
              Certificate ID: {certificateId}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Ionicons name="download-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Save to Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Share Certificate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Ionicons name="refresh-outline" size={22} color="#333" />
          <Text style={styles.resetText}>Create New Certificate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.successBox}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.successText}>
          Congratulations! Your certificate is ready.
        </Text>
      </View>
    </ScrollView>
  );
};

export default CertificateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F9EF",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 5,
  },
  generateButton: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  previewBox: {
    backgroundColor: "#DFF7E1",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#A7E4B3",
  },
  previewTitle: { fontWeight: "bold", color: "#2D6A4F", marginBottom: 5 },
  previewItem: { color: "#2D6A4F" },

  certificateContainer: {
    flex: 1,
    backgroundColor: "#F3FFF4",
    padding: 20,
  },
  certificateCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  certificateBackground: {
    padding: 20,
  },
  certificateContent: {
    alignItems: "center",
  },
  certificateHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#444",
  },
  certificateSubHeader: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: "70%",
    backgroundColor: "#FFD700",
    marginVertical: 15,
  },
  smallText: { color: "#555", fontSize: 16 },
  userName: { fontSize: 28, fontWeight: "bold", color: "#000", marginTop: 5 },
  courseName: { fontSize: 22, color: "#007f5f", fontWeight: "700", marginTop: 8 },
  tagline: {
    backgroundColor: "#e8f5e9",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    color: "#388e3c",
    marginTop: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "100%",
  },
  footerItem: { alignItems: "center", flex: 1 },
  footerLabel: { fontSize: 12, color: "#666" },
  footerValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  certificateId: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    marginBottom: 30,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEE",
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
  resetText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  successBox: {
    alignItems: "center",
    backgroundColor: "#E0F7E9",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },
  emoji: { fontSize: 40 },
  successText: { fontSize: 16, fontWeight: "bold", color: "#2E7D32" },
});
