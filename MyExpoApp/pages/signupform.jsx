import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    college: "",
    instructor: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Navigate directly to Home without validation
  const handleSubmit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Join Our Community</Text>
      <Text style={styles.subtitle}>Create an account to get started.</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={form.fullName}
        onChangeText={(text) => handleInputChange("fullName", text)}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />

      <Text style={styles.label}>College Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your college name"
        value={form.college}
        onChangeText={(text) => handleInputChange("college", text)}
      />

      <Text style={styles.label}>Instructor Name</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.instructor}
          onValueChange={(value) => handleInputChange("instructor", value)}
        >
          <Picker.Item label="Select your instructor" value="" />
          <Picker.Item label="Instructor A" value="instructorA" />
          <Picker.Item label="Instructor B" value="instructorB" />
        </Picker>
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <FontAwesome5
            name={showPassword ? "eye-slash" : "eye"}
            size={18}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm your password"
          secureTextEntry={!showConfirm}
          value={form.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.icon}
        >
          <FontAwesome5
            name={showConfirm ? "eye-slash" : "eye"}
            size={18}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleInputChange("agree", !form.agree)}
        >
          {form.agree ? (
            <FontAwesome5 name="check-square" size={20} color="#0077FF" />
          ) : (
            <FontAwesome5 name="square" size={20} color="#999" />
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms and Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginTextContainer}>
        <Text style={styles.alreadyText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  icon: {
    padding: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    color: "#4b5563",
  },
  link: {
    color: "#0077FF",
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#ff6b00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  alreadyText: {
    color: "#4b5563",
  },
  loginLink: {
    color: "#0077FF",
    fontWeight: "600",
  },
});
