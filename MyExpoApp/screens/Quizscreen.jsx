// PlasticAwarenessPuzzleRN.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

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
    { name: 'Human Impact', short: 'Human', ids: [1, 2] },
    { name: 'Marine Life', short: 'Marine', ids: [3, 4] },
    { name: 'Land Animals', short: 'Land', ids: [5, 6] },
    { name: 'Water Systems', short: 'Water', ids: [7, 8] }
  ];

  // grid has 8 slots (2 slots per category)
  const [grid, setGrid] = useState(Array(8).fill(null));
  const [availablePieces, setAvailablePieces] = useState(() =>
    [...allPieces].sort(() => Math.random() - 0.5)
  );
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Select a piece from available (or from grid to move)
  const selectAvailablePiece = (piece) => {
    if (submitted) return;
    setSelectedPiece({ piece, from: 'available' });
  };

  const selectPlacedPiece = (index) => {
    if (submitted) return;
    const piece = grid[index];
    if (!piece) return;
    setSelectedPiece({ piece, from: 'grid', gridIndex: index });
  };

  // Place selected on a grid index
  const placeOnGrid = (index) => {
    if (!selectedPiece || submitted) return;

    const newGrid = [...grid];
    const newAvailable = [...availablePieces];

    if (selectedPiece.from === 'available') {
      // If target slot already has a piece, move it back to available
      if (newGrid[index]) {
        newAvailable.push(newGrid[index]);
      }
      newGrid[index] = selectedPiece.piece;
      // remove placed piece from available
      const idx = newAvailable.findIndex((p) => p.id === selectedPiece.piece.id);
      if (idx > -1) newAvailable.splice(idx, 1);
    } else if (selectedPiece.from === 'grid') {
      // swap or move within grid
      const fromIdx = selectedPiece.gridIndex;
      if (fromIdx === index) {
        // tapping same slot -> deselect
        setSelectedPiece(null);
        return;
      }
      // if target has piece, swap them
      const temp = newGrid[index];
      newGrid[index] = newGrid[fromIdx];
      newGrid[fromIdx] = temp || null;
    }

    setGrid(newGrid);
    setAvailablePieces(newAvailable);
    setSelectedPiece(null);
  };

  // Return a placed piece back to available by tapping an 'empty area' or long-press on piece (we provide a button)
  const removeFromGridToAvailable = (index) => {
    if (submitted) return;
    const newGrid = [...grid];
    const newAvailable = [...availablePieces];
    if (newGrid[index]) {
      newAvailable.push(newGrid[index]);
      newGrid[index] = null;
      setGrid(newGrid);
      setAvailablePieces(newAvailable);
      setSelectedPiece(null);
    }
  };

  const resetPuzzle = () => {
    setGrid(Array(8).fill(null));
    setAvailablePieces([...allPieces].sort(() => Math.random() - 0.5));
    setCompletedCategories([]);
    setShowCelebration(false);
    setSubmitted(false);
    setSelectedPiece(null);
  };

  const handleSubmit = () => {
    const completed = [];

    categories.forEach((cat, catIndex) => {
      const startIdx = catIndex * 2;
      const piece1 = grid[startIdx];
      const piece2 = grid[startIdx + 1];

      if (
        piece1 &&
        piece2 &&
        cat.ids.includes(piece1.id) &&
        cat.ids.includes(piece2.id)
      ) {
        completed.push(cat.name);
      }
    });

    setSubmitted(true);
    setCompletedCategories(completed);
    setTimeout(() => setShowCelebration(true), 500);
  };

  const isCategoryComplete = (catIndex) => {
    if (!submitted) return false;
    return completedCategories.includes(categories[catIndex].name);
  };

  const isCategoryWrong = (catIndex) => {
    if (!submitted) return false;
    const startIdx = catIndex * 2;
    const piece1 = grid[startIdx];
    const piece2 = grid[startIdx + 1];
    return piece1 && piece2 && !completedCategories.includes(categories[catIndex].name);
  };

  const allGridsFilled = grid.every((slot) => slot !== null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌍 Plastic Awareness Puzzle</Text>
        <Text style={styles.subtitle}>Tap a piece, then tap a slot to place it</Text>

        <View style={styles.progress}>
          <Text style={styles.trophy}>🏆</Text>
          <Text style={styles.progressText}>{completedCategories.length} / 4 Categories Complete</Text>
        </View>
      </View>

      <View style={styles.main}>
        {/* Left: Available pieces */}
        <View style={styles.availableBox}>
          <View style={styles.availableHeader}>
            <Text style={styles.availableTitle}>✨ Pieces</Text>
            <Text style={styles.count}>{availablePieces.length}</Text>
          </View>

          <View style={styles.availableGrid}>
            {availablePieces.map((piece) => {
              const isSelected = selectedPiece && selectedPiece.piece.id === piece.id && selectedPiece.from === 'available';
              return (
                <TouchableOpacity
                  key={piece.id}
                  style={[styles.pieceTile, isSelected && styles.selectedPiece]}
                  onPress={() => selectAvailablePiece(piece)}
                >
                  <Text style={styles.pieceEmoji}>{piece.emoji}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.button} onPress={resetPuzzle}>
            <Text style={styles.buttonText}>🔁 Reset</Text>
          </TouchableOpacity>

          {allGridsFilled && !submitted && (
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={[styles.buttonText, styles.submitButtonText]}>✅ Submit Answer</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.smallText}>Filled: {grid.filter(s => s !== null).length} / 8</Text>
        </View>

        {/* Right: Categories and grid */}
        <View style={styles.categoriesBox}>
          {categories.map((category, catIndex) => {
            const startIdx = catIndex * 2;
            const isComplete = isCategoryComplete(catIndex);
            const wrong = isCategoryWrong(catIndex);
            return (
              <View
                key={category.name}
                style={[
                  styles.categoryCard,
                  isComplete ? styles.cardComplete : wrong ? styles.cardWrong : styles.cardNeutral
                ]}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>🌿</Text>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  {isComplete && <Text style={styles.check}>✅</Text>}
                  {wrong && <Text style={styles.wrong}>✗ Wrong</Text>}
                </View>

                <View style={styles.slotRow}>
                  {[0, 1].map((offset) => {
                    const index = startIdx + offset;
                    const piece = grid[index];
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[styles.slot, piece ? styles.slotFilled : styles.slotEmpty]}
                        onPress={() => {
                          if (selectedPiece) {
                            // try to place selected on this slot
                            placeOnGrid(index);
                          } else if (piece) {
                            // select placed piece to move
                            selectPlacedPiece(index);
                          }
                        }}
                        onLongPress={() => removeFromGridToAvailable(index)}
                      >
                        {piece ? (
                          <Text style={styles.pieceEmojiLarge} accessibilityLabel={piece.message}>
                            {piece.emoji}
                          </Text>
                        ) : (
                          <Text style={styles.slotNumber}>{offset + 1}</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {isComplete && grid[startIdx] && (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageText}>✓ {grid[startIdx].message}</Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Feedback Area / Celebration */}
          {showCelebration ? (
            <View style={styles.celebration}>
              <Text style={styles.award}>🏅</Text>
              <Text style={styles.celebrationTitle}>
                {completedCategories.length === 4 ? '🎉 Perfect Score!' : '🌟 Great Effort!'}
              </Text>
              <Text style={styles.celebrationSubtitle}>
                You got {completedCategories.length} / 4 categories right
              </Text>
              <TouchableOpacity style={[styles.button, styles.tryAgain]} onPress={resetPuzzle}>
                <Text style={styles.buttonText}>🔁 Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>
                {allGridsFilled && !submitted
                  ? '✨ All pieces placed! Tap Submit Answer to check your results'
                  : '💡 Tap a piece, then tap a slot to place it. Long-press a placed piece to return it to the pool.'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlasticAwarenessPuzzle;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 8,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  trophy: { fontSize: 18, marginRight: 8 },
  progressText: { fontWeight: '700', color: '#374151' },

  main: {
    flexDirection: 'row',
    gap: 12,
  },

  availableBox: {
    width: '38%',
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  availableHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  availableTitle: { fontWeight: '800', color: '#111827' },
  count: { color: '#0ea5e9', fontWeight: '700' },
  availableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  pieceTile: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#e6f6ff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  selectedPiece: {
    borderWidth: 2,
    borderColor: '#06b6d4',
    transform: [{ scale: 1.05 }],
  },
  pieceEmoji: { fontSize: 28 },
  button: {
    marginTop: 10,
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontWeight: '700' },
  submitButton: { backgroundColor: '#10b981' },
  submitButtonText: { color: '#fff' },
  smallText: { textAlign: 'center', color: '#6b7280', marginTop: 6 },

  categoriesBox: {
    width: '62%',
    paddingLeft: 12,
  },
  categoryCard: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardNeutral: { backgroundColor: '#f8fafc', borderColor: '#e5e7eb' },
  cardComplete: { backgroundColor: '#ecfdf5', borderColor: '#34d399' },
  cardWrong: { backgroundColor: '#fff1f2', borderColor: '#fca5a5' },

  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  categoryIcon: { fontSize: 18, marginRight: 8 },
  categoryTitle: { flex: 1, fontWeight: '800', color: '#111827' },
  check: { marginLeft: 8 },
  wrong: { color: '#dc2626', fontWeight: '700' },

  slotRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  slot: {
    flex: 1,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  slotEmpty: { backgroundColor: '#fff', borderWidth: 1, borderStyle: 'dashed', borderColor: '#d1d5db' },
  slotFilled: { backgroundColor: '#e6fffa', borderWidth: 1, borderColor: '#c7f9ef' },

  slotNumber: { color: '#c7c7c7', fontSize: 18, fontWeight: '800' },
  pieceEmojiLarge: { fontSize: 36 },

  messageBox: { marginTop: 10, padding: 8, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  messageText: { color: '#065f46', textAlign: 'center' },

  celebration: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecfeff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginTop: 8,
  },
  award: { fontSize: 40 },
  celebrationTitle: { fontSize: 18, fontWeight: '800', marginTop: 8 },
  celebrationSubtitle: { color: '#374151', marginVertical: 8 },
  tryAgain: { backgroundColor: '#10b981', marginTop: 8 },

  hintBox: { padding: 10, backgroundColor: '#fffbeb', borderRadius: 12, borderWidth: 1, borderColor: '#fde68a', marginTop: 8 },
  hintText: { color: '#92400e' },
});
