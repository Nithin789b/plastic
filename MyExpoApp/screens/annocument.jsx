// screens/Annocument.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  Share,
  StyleSheet,
} from "react-native";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Info,
  X,
  ExternalLink,
  Share2,
  Heart,
} from "lucide-react-native";

const events = [
  {
    id: "cleanliness",
    title: "Cleanliness Drive",
    datetime: "Sat, Nov 1, 2025 — 08:00 AM to 11:30 AM",
    date: "Saturday, November 1, 2025",
    time: "08:00 AM to 11:30 AM",
    location: "Community Park, Sector 12",
    description:
      "Join us to keep our neighbourhood clean. Tools will be provided.",
    fullDescription:
      "Be part of our community cleanliness initiative! We'll be cleaning up Community Park and the surrounding areas. All cleaning tools, gloves, and safety equipment will be provided.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/cleanliness",
    organizer: "Green Community Initiative",
    capacity: "50 volunteers",
    benefits: ["Free breakfast", "Community service certificate"],
    requirements: ["Comfortable clothing", "Water bottle", "Sun protection"],
  },
  {
    id: "awareness",
    title: "Awareness Campaign",
    datetime: "Sun, Nov 2, 2025 — 10:00 AM to 01:00 PM",
    date: "Sunday, November 2, 2025",
    time: "10:00 AM to 01:00 PM",
    location: "Town Hall Auditorium",
    description:
      "Informative sessions on waste segregation and healthy habits.",
    fullDescription:
      "Join our comprehensive awareness campaign focused on sustainable living practices.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/awareness",
    organizer: "Eco Warriors Foundation",
    capacity: "100 participants",
    benefits: ["Free lunch", "Information booklet"],
    requirements: ["Valid ID", "Registration confirmation"],
  },
  {
    id: "plantation",
    title: "Plantation Drive",
    datetime: "Mon, Nov 3, 2025 — 07:00 AM to 10:00 AM",
    date: "Monday, November 3, 2025",
    time: "07:00 AM to 10:00 AM",
    location: "Riverfront Greenbelt",
    description: "Help us plant native trees — saplings and guidance provided.",
    fullDescription:
      "Join us in creating a greener future! We'll be planting 200+ native tree saplings along the Riverfront Greenbelt. Expert horticulturists will guide you through the planting process. Each participant will receive a certificate with their tree's GPS location for future visits.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    registerUrl: "https://example.com/register/plantation",
    organizer: "Trees for Tomorrow",
    capacity: "75 volunteers",
    benefits: [
      "Tree adoption certificate",
      "Refreshments",
      "Plantation training",
    ],
    requirements: [
      "Garden gloves (optional)",
      "Comfortable footwear",
      "Early morning enthusiasm",
    ],
    color: "from-teal-500 to-green-600",
  }
];

const Annocument = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);

  const handleRegister = (url) => {
    Linking.openURL(url);
  };

  const toggleLike = (id) => {
    setLikedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const shareEvent = async (event) => {
    try {
      await Share.share({
        title: event.title,
        message: `${event.title}\n${event.description}\nRegister here: ${event.registerUrl}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Community Events</Text>
      <Text style={styles.subHeader}>
        Join us in making a difference in our community
      </Text>

      <View style={styles.cardContainer}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.card}
            onPress={() => setSelectedEvent(event)}
          >
            <Image source={{ uri: event.image }} style={styles.image} />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleLike(event.id)}
            >
              <Heart
                size={20}
                color={likedEvents.includes(event.id) ? "red" : "black"}
                fill={likedEvents.includes(event.id) ? "red" : "none"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.likeButton, { right: 50 }]}
              onPress={() => shareEvent(event)}
            >
              <Share2 size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.cardBody}>
              <Text style={styles.title}>{event.title}</Text>

              <View style={styles.row}>
                <Calendar size={16} color="#3b82f6" />
                <Text style={styles.detailText}>{event.datetime}</Text>
              </View>
              <View style={styles.row}>
                <MapPin size={16} color="#16a34a" />
                <Text style={styles.detailText}>{event.location}</Text>
              </View>

              <Text style={styles.desc}>{event.description}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => setSelectedEvent(event)}
                >
                  <Text style={styles.viewText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => handleRegister(event.registerUrl)}
                >
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={!!selectedEvent} animationType="slide">
        {selectedEvent && (
          <ScrollView style={styles.modalContainer}>
            <Image
              source={{ uri: selectedEvent.image }}
              style={styles.modalImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedEvent(null)}
            >
              <X size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
            <Text style={styles.modalSub}>{selectedEvent.organizer}</Text>

            <View style={styles.infoCard}>
              <Calendar size={20} color="#2563eb" />
              <Text style={styles.infoText}>{selectedEvent.date}</Text>
            </View>
            <View style={styles.infoCard}>
              <Clock size={20} color="#059669" />
              <Text style={styles.infoText}>{selectedEvent.time}</Text>
            </View>
            <View style={styles.infoCard}>
              <Users size={20} color="#7c3aed" />
              <Text style={styles.infoText}>{selectedEvent.capacity}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About This Event</Text>
              <Text style={styles.sectionText}>
                {selectedEvent.fullDescription}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {selectedEvent.benefits.map((b, i) => (
                <Text key={i} style={styles.bullet}>
                  • {b}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {selectedEvent.requirements.map((r, i) => (
                <Text key={i} style={styles.bullet}>
                  • {r}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.modalRegisterButton}
              onPress={() => handleRegister(selectedEvent.registerUrl)}
            >
              <ExternalLink size={20} color="white" />
              <Text style={styles.modalRegisterText}>Register Now</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </ScrollView>
  );
};

export default Annocument;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  header: { fontSize: 28, fontWeight: "900", color: "#1e3a8a", textAlign: "center", marginTop: 10 },
  subHeader: { textAlign: "center", color: "#6b7280", marginBottom: 20 },
  cardContainer: { gap: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    marginBottom: 20,
  },
  image: { width: "100%", height: 180 },
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#ffffffcc",
    padding: 8,
    borderRadius: 50,
  },
  cardBody: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 6 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  detailText: { marginLeft: 6, color: "#4b5563" },
  desc: { color: "#374151", marginTop: 6, marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  viewButton: {
    backgroundColor: "#f3f4f6",
    flex: 1,
    padding: 10,
    marginRight: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#2563eb",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  viewText: { color: "#111827", fontWeight: "600" },
  registerText: { color: "#fff", fontWeight: "600" },

  // Modal styles
  modalContainer: { flex: 1, backgroundColor: "#fff" },
  modalImage: { width: "100%", height: 250 },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
  },
  modalTitle: { fontSize: 26, fontWeight: "800", color: "#111827", marginTop: 16, textAlign: "center" },
  modalSub: { textAlign: "center", color: "#6b7280", marginBottom: 20 },
  infoCard: { flexDirection: "row", alignItems: "center", marginBottom: 8, marginLeft: 20 },
  infoText: { marginLeft: 10, color: "#374151" },
  section: { margin: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  sectionText: { color: "#374151", lineHeight: 20 },
  bullet: { marginLeft: 10, color: "#4b5563" },
  modalRegisterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d4ed8",
    padding: 14,
    borderRadius: 12,
    margin: 20,
  },
  modalRegisterText: { color: "white", fontWeight: "700", marginLeft: 6 },
});
