import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const KnowledgeBlogScreen = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]); // Track completed topics

  const blogCategories = [
    {
      id: 1,
      title: "Marine Pollution",
      color: "#4A90E2",
      image: require("../assets/images/marine-life.png"),
      content: {
        intro:
          "The ocean has become the ultimate sink for plastic pollution. An estimated 8 to 12 million metric tons of plastic enter our oceans annually, forming vast garbage patches and permeating every level of the water column.",
        sections: [
          {
            title: "Effects",
            text: "Marine animals, from tiny plankton to majestic whales, suffer horrifying fates. Turtles mistake plastic bags for jellyfish, leading to fatal blockages. Seabirds, seals, and dolphins become entangled in debris, resulting in injury, drowning, or slow starvation.",
          },
          {
            title: "Causes",
            text: "Improper disposal of plastics, illegal dumping, and land-based runoff from cities are major causes.",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Wildlife Impact",
      color: "#50C5F5",
      image: require("../assets/images/animal.png"),
      content: {
        intro:
          "On beaches suffocating in plastic, innocent lives pay the ultimate price. Sea turtles and birds suffer from entanglement and ingestion of waste.",
        sections: [
          {
            title: "Effects",
            text: "Plastic waste blocks digestive tracts and suffocates animals through entanglement.",
          },
          {
            title: "Causes",
            text: "Littering, ghost nets, and poor waste management lead to plastic reaching animal habitats.",
          },
        ],
      },
    },
    {
      id: 3,
      title: "Soil Contamination",
      color: "#8B7355",
      image: require("../assets/images/soil.png"),
      content: {
        intro:
          "Plastic pollution in soil disrupts natural processes and harms agriculture.",
        sections: [
          {
            title: "Effects",
            text: "Microplastics affect soil fertility and harm microorganisms vital for healthy soil.",
          },
          {
            title: "Causes",
            text: "Improper waste disposal and plastic use in agriculture lead to contamination.",
          },
        ],
      },
    },
    {
      id: 4,
      title: "Human Health",
      color: "#E85D75",
      image: require("../assets/images/human.png"),
      content: {
        intro:
          "Plastic’s impact extends to humans through food, air, and water contamination.",
        sections: [
          {
            title: "Effects",
            text: "Microplastics have been detected in blood, lungs, and placentas, posing long-term risks.",
          },
          {
            title: "Causes",
            text: "Overreliance on disposable products and weak recycling systems.",
          },
        ],
      },
    },
  ];

  const totalTopics = blogCategories.length;
  const completionPercentage = Math.round(
    (completedTopics.length / totalTopics) * 100
  );

  const handleBlogComplete = (blogId) => {
    if (!completedTopics.includes(blogId)) {
      setCompletedTopics((prev) => [...prev, blogId]);
    }
    setSelectedBlog(null);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>The Plastic Tide</Text>
        <Text style={styles.heroSubtitle}>
          Learn how plastic pollution affects life on Earth
        </Text>

        {/* Progress Tracker */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${completionPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{completionPercentage}% Completed</Text>
        </View>
      </View>

      {/* Blog Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.sectionTitle}>Explore Topics</Text>

        {blogCategories.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={[
              styles.blogCard,
              { borderLeftColor: blog.color },
              completedTopics.includes(blog.id) && styles.completedCard,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedBlog(blog)}
          >
            <Image source={blog.image} style={styles.blogImage} />
            <View style={styles.blogTextContainer}>
              <Text style={styles.blogTitle}>{blog.title}</Text>
              <Text style={styles.blogSubtitle}>
                {completedTopics.includes(blog.id)
                  ? "Completed"
                  : "Tap to learn more"}
              </Text>
            </View>
            <Ionicons
              name={
                completedTopics.includes(blog.id)
                  ? "checkmark-circle"
                  : "chevron-forward"
              }
              size={24}
              color={completedTopics.includes(blog.id) ? "#4CAF50" : "#777"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Blog Details */}
      <Modal visible={!!selectedBlog} animationType="slide">
        {selectedBlog && (
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedBlog(null)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedBlog.title}</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
              <Image source={selectedBlog.image} style={styles.modalImage} />
              <View style={styles.modalContent}>
                <Text style={styles.modalIntro}>
                  {selectedBlog.content.intro}
                </Text>

                {selectedBlog.content.sections.map((section, i) => (
                  <View key={i} style={styles.sectionContainer}>
                    <View
                      style={[
                        styles.sectionHeader,
                        { backgroundColor: selectedBlog.color + "20" },
                      ]}
                    >
                      <View
                        style={[
                          styles.sectionDot,
                          { backgroundColor: selectedBlog.color },
                        ]}
                      />
                      <Text style={styles.sectionHeading}>
                        {section.title}
                      </Text>
                    </View>
                    <Text style={styles.sectionText}>{section.text}</Text>
                  </View>
                ))}

                {/* Completion Button */}
                <TouchableOpacity
                  style={[styles.completeButton, { backgroundColor: selectedBlog.color }]}
                  onPress={() => handleBlogComplete(selectedBlog.id)}
                >
                  <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                  <Text style={styles.completeButtonText}>Mark as Completed</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFB" },
  heroSection: {
    backgroundColor: "#4A90E2",
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  heroTitle: { fontSize: 32, fontWeight: "800", color: "#fff", marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: "#EAF3FF", lineHeight: 22 },
  progressContainer: { marginTop: 20 },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#00C853",
    borderRadius: 10,
  },
  progressText: {
    textAlign: "right",
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  blogCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.9,
    backgroundColor: "#E8F5E9",
  },
  blogImage: { width: 60, height: 60, borderRadius: 12, marginRight: 16 },
  blogTextContainer: { flex: 1 },
  blogTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  blogSubtitle: { fontSize: 13, color: "#777", marginTop: 4 },
  modalContainer: { flex: 1, backgroundColor: "#fff" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F7F8FA",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#222" },
  modalImage: { width: "100%", height: 220 },
  modalContent: { padding: 20 },
  modalIntro: { fontSize: 16, lineHeight: 26, color: "#444", marginBottom: 20 },
  sectionContainer: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  sectionDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  sectionHeading: { fontSize: 18, fontWeight: "700", color: "#222" },
  sectionText: { fontSize: 15, lineHeight: 24, color: "#555" },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default KnowledgeBlogScreen;
