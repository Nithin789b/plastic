// screens/Quiz.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const questions = [
  {
    question: "When buying snacks from the canteen, which option creates less plastic waste?",
    image: "samosa_snack_comparison",
    imageDesc: "🛍️ Plastic bag vs. 🧺 Reusable cloth bag",
    options: ["Using a plastic bag", "Using a reusable cloth bag"],
    answer: "Using a reusable cloth bag",
  },
  {
    question: "You're thirsty during school. Which is the better choice for the environment?",
    image: "water_bottle_comparison",
    imageDesc: "🥤 Plastic bottle vs. 🍶 Steel bottle",
    options: ["Buying a new plastic water bottle", "Refilling a reusable steel bottle"],
    answer: "Refilling a reusable steel bottle",
  },
  {
    question: "For packing your lunch, which method helps reduce plastic pollution?",
    image: "lunch_packing_comparison",
    imageDesc: "🥡 Plastic wrap vs. 🍱 Tiffin box",
    options: ["Wrapping food in plastic and using disposable cutlery", "Using a reusable tiffin box with reusable cutlery"],
    answer: "Using a reusable tiffin box with reusable cutlery",
  },
  {
    question: "After finishing your juice box and other snacks, how should you dispose of the waste to help recycling efforts?",
    image: "waste_disposal_comparison",
    imageDesc: "🗑️ Mixed waste vs. ♻️ Segregated bins",
    options: ["Throwing all waste into one bin", "Separating plastic, wet, and paper waste into different bins"],
    answer: "Separating plastic, wet, and paper waste into different bins",
  },
  {
    question: "Your family is going shopping. Which bag should you take to avoid plastic pollution?",
    image: "shopping_bag_comparison",
    imageDesc: "🛍️ Plastic bag vs. 👜 Cloth bag",
    options: ["Plastic carry bag", "Reusable cloth bag"],
    answer: "Reusable cloth bag",
  },
  {
    question: "You've finished a cold drink. What's the most responsible thing to do with the plastic straw?",
    image: "straw_disposal_comparison",
    imageDesc: "🥤 Plastic straw vs. 🌾 Paper/Reusable straw",
    options: ["Throw it on the ground", "Ask for no straw next time, or use a reusable one"],
    answer: "Ask for no straw next time, or use a reusable one",
  },
  {
    question: "You see a plastic bottle lying on the street. What's the best action to take?",
    image: "street_litter_action",
    imageDesc: "🚮 Pick up litter vs. 👁️ Ignore it",
    options: ["Leave it there", "Pick it up and put it in a recycling bin"],
    answer: "Pick it up and put it in a recycling bin",
  },
  {
    question: "Which of these everyday items contributes most to single-use plastic waste?",
    image: "single_use_items_comparison",
    imageDesc: "📚 Books vs. 🥤 Disposable items",
    options: ["Books", "Plastic wrappers and disposable containers"],
    answer: "Plastic wrappers and disposable containers",
  },
  {
    question: "To help marine life, what should you avoid doing near rivers or the ocean?",
    image: "river_ocean_litter",
    imageDesc: "🌊 Clean water vs. 🗑️ Polluted water",
    options: ["Throwing plastic waste into the water", "Ensuring no plastic waste enters the water"],
    answer: "Ensuring no plastic waste enters the water",
  },
  {
    question: "When buying groceries, what helps reduce plastic packaging?",
    image: "grocery_shopping_options",
    imageDesc: "📦 Pre-packaged vs. 🥬 Loose vegetables",
    options: ["Buying pre-packaged vegetables in plastic trays", "Choosing loose vegetables and carrying a reusable net bag"],
    answer: "Choosing loose vegetables and carrying a reusable net bag",
  },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (selected) => {
    if (isAnswered) return;
    
    setSelectedAnswer(selected);
    setIsAnswered(true);
    
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getButtonStyle = (option) => {
    if (!isAnswered) return styles.option;
    
    if (option === questions[current].answer) {
      return [styles.option, styles.correctOption];
    }
    if (option === selectedAnswer && option !== questions[current].answer) {
      return [styles.option, styles.wrongOption];
    }
    return [styles.option, styles.disabledOption];
  };

  const getQuestionImage = (imageName, imageDesc) => {
    return (
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageDescText}>{imageDesc}</Text>
        <Text style={styles.imageLabel}>Visual Comparison</Text>
      </View>
    );
  };

  if (showScore) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let emoji = "";

    if (percentage >= 80) {
      message = "Excellent! You're a plastic pollution champion!";
      emoji = "🌟";
    } else if (percentage >= 60) {
      message = "Great job! You're on the right track!";
      emoji = "👍";
    } else {
      message = "Keep learning! Every small action counts!";
      emoji = "💪";
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.scoreCard}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.scoreTitle}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} / {questions.length}
          </Text>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, styles.wrongStat]}>
                {questions.length - score}
              </Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔄 Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.quizCard}>
        <View style={styles.header}>
          <Text style={styles.progress}>
            Question {current + 1} of {questions.length}
          </Text>
          <View style={styles.scoreIndicator}>
            <Text style={styles.scoreIndicatorText}>Score: {score}</Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((current + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>

        {getQuestionImage(questions[current].image, questions[current].imageDesc)}

        <Text style={styles.question}>{questions[current].question}</Text>

        <View style={styles.optionsContainer}>
          {questions[current].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getButtonStyle(option)}
              onPress={() => handleAnswer(option)}
              disabled={isAnswered}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionNumber}>{String.fromCharCode(65 + index)}</Text>
                <Text style={styles.optionText}>{option}</Text>
              </View>
              {isAnswered && option === questions[current].answer && (
                <Text style={styles.checkmark}>✓</Text>
              )}
              {isAnswered && option === selectedAnswer && option !== questions[current].answer && (
                <Text style={styles.crossmark}>✗</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {isAnswered && (
          <View style={styles.feedbackContainer}>
            <Text style={selectedAnswer === questions[current].answer ? styles.correctFeedback : styles.wrongFeedback}>
              {selectedAnswer === questions[current].answer 
                ? "🎉 Correct! Great job!" 
                : "❌ Incorrect. Keep learning!"}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e8f5e9",
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  quizCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progress: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  scoreIndicator: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreIndicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 3,
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#f0f9f0",
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#c8e6c9",
    borderStyle: "dashed",
  },
  imageDescText: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: "center",
  },
  imageLabel: {
    fontSize: 14,
    color: "#4caf50",
    fontWeight: "600",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: "#f1f8f4",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#c8e6c9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  correctOption: {
    backgroundColor: "#c8e6c9",
    borderColor: "#4caf50",
  },
  wrongOption: {
    backgroundColor: "#ffcdd2",
    borderColor: "#f44336",
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4caf50",
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "bold",
    marginRight: 12,
    fontSize: 14,
  },
  optionText: {
    fontSize: 15,
    color: "#1b5e20",
    fontWeight: "500",
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: "#4caf50",
    fontWeight: "bold",
  },
  crossmark: {
    fontSize: 24,
    color: "#f44336",
    fontWeight: "bold",
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  correctFeedback: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  wrongFeedback: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f44336",
  },
  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    color: "#666",
    marginBottom: 8,
  },
  percentage: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: "#f1f8f4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 100,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 4,
  },
  wrongStat: {
    color: "#f44336",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  restartButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Quiz;