import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlasticAwarenessPuzzle = () => {
  const allPieces = [
    { id: 1, emoji: "🧑", category: "Human Impact", message: "Humans consume microplastics daily" },
    { id: 2, emoji: "⚠️", category: "Human Impact", message: "Microplastics found in our blood" },
    { id: 3, emoji: "🐢", category: "Marine Life", message: "Sea turtles mistake plastic for food" },
    { id: 4, emoji: "🌊", category: "Marine Life", message: "Oceans filled with plastic waste" },
    { id: 5, emoji: "🦌", category: "Land Animals", message: "Wildlife trapped in plastic debris" },
    { id: 6, emoji: "🛍️", category: "Land Animals", message: "Animals eat plastic bags" },
    { id: 7, emoji: "💧", category: "Water Systems", message: "Plastic pollutes drinking water" },
    { id: 8, emoji: "♻️", category: "Water Systems", message: "Recycling helps protect water" },
  ];

  const categories = [
    { name: "Human Impact", ids: [1, 2], color: "#FCA5A5" },
    { name: "Marine Life", ids: [3, 4], color: "#93C5FD" },
    { name: "Land Animals", ids: [5, 6], color: "#86EFAC" },
    { name: "Water Systems", ids: [7, 8], color: "#A5F3FC" },
  ];

  const [availablePieces, setAvailablePieces] = useState(
    [...allPieces].sort(() => Math.random() - 0.5)
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [placedPieces, setPlacedPieces] = useState({});
  const [completed, setCompleted] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handlePiecePress = (piece) => {
    if (!selectedCategory) {
      Alert.alert("Select a category first");
      return;
    }

    setPlacedPieces((prev) => {
      const existing = prev[selectedCategory] || [];
      if (existing.length >= 2) {
        Alert.alert("This category already has 2 pieces");
        return prev;
      }

      const updated = { ...prev, [selectedCategory]: [...existing, piece] };
      setAvailablePieces(availablePieces.filter((p) => p.id !== piece.id));
      return updated;
    });
  };

  const handleSubmit = () => {
    const completedCats = categories.filter((cat) => {
      const placed = placedPieces[cat.name];
      if (!placed || placed.length !== 2) return false;
      return placed.every((p) => cat.ids.includes(p.id));
    });

    setCompleted(completedCats.map((c) => c.name));
    setSubmitted(true);

    if (completedCats.length === 4) {
      Alert.alert("🎉 Perfect Score!", "You matched all categories correctly!");
    } else {
      Alert.alert("✅ Great Effort!", `You got ${completedCats.length} / 4 correct.`);
    }
  };

  const resetPuzzle = () => {
    setAvailablePieces([...allPieces].sort(() => Math.random() - 0.5));
    setPlacedPieces({});
    setCompleted([]);
    setSubmitted(false);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 Plastic Awareness Puzzle</Text>
      <Text style={styles.subtitle}>
        Tap a category, then tap emojis to place them
      </Text>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryBox,
              { backgroundColor: cat.color },
              selectedCategory === cat.name && styles.selectedCategory,
              submitted && completed.includes(cat.name) && styles.completedCategory,
            ]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Text style={styles.categoryName}>{cat.name}</Text>
            <View style={styles.piecesRow}>
              {(placedPieces[cat.name] || []).map((piece) => (
                <Text key={piece.id} style={styles.emoji}>
                  {piece.emoji}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Available Pieces */}
      <Text style={styles.sectionTitle}>🧩 Available Pieces</Text>
      <FlatList
        data={availablePieces}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pieceButton}
            onPress={() => handlePiecePress(item)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetPuzzle}>
          <Ionicons name="refresh" size={20} color="#000" />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={submitted}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlasticAwarenessPuzzle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  categoriesContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  categoryBox: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  selectedCategory: {
    borderWidth: 3,
    borderColor: "#0284C7",
  },
  completedCategory: {
    borderWidth: 3,
    borderColor: "#10B981",
  },
  piecesRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  emoji: {
    fontSize: 28,
    marginHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  pieceButton: {
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    padding: 15,
    margin: 5,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "#111",
    marginLeft: 6,
  },
  submitText: {
    fontWeight: "600",
    color: "#FFF",
    marginLeft: 6,
  },
});
