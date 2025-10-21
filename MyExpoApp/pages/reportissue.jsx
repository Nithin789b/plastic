import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Camera, RefreshCw, CheckCircle2 } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const { width } = Dimensions.get("window");

const ReportIssuePage = () => {
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState("");
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mapRef = useRef(null);

  const department = "Municipal Department"; // Default department

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: { lat, lon, format: "jsonv2" },
        headers: { "User-Agent": "ReactNativeApp" },
      });
      const addr = res.data.address;
      const formatted = [
        addr.house_number,
        addr.road,
        addr.suburb,
        addr.village,
        addr.town,
        addr.county,
        addr.state,
        addr.postcode,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");
      setLocationAddress(formatted || `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    } catch (err) {
      setLocationAddress(`${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    }
  };

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    setLocationError(false);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Enable location permission in settings.", [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]);
        setLocationError(true);
        setLocationLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      setLocation(coords);
      await getAddressFromCoords(coords.latitude, coords.longitude);
      setLocationLoading(false);

      if (mapRef.current) {
        mapRef.current.animateToRegion({ ...coords, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 500);
      }
    } catch (err) {
      setLocationError(true);
      setLocationLoading(false);
      Alert.alert("Error", "Could not get location. Try again.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets?.[0]?.uri) setPhotoUri(result.assets[0].uri);
  };

  const handleRemovePhoto = () => setPhotoUri(null);
  const handleRetryLocation = () => getCurrentLocation();

  const handleSubmit = async () => {
    if (!description.trim() || !photoUri || !location) {
      Alert.alert("Missing info", "Please complete all required fields.");
      return;
    }
    setSubmitLoading(true);
    setTimeout(() => {
      setShowSuccess(true);
      setSubmitLoading(false);
      setDescription("");
      setPhotoUri(null);
    }, 1500);
  };

  if (showSuccess)
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.successContainer}>
          <CheckCircle2 size={80} color="#2ECC71" />
          <Text style={styles.successTitle}>Report Submitted!</Text>
          <Text style={styles.successMessage}>
            Your report has been received. Thank you for helping improve the community!
          </Text>
          <Text style={styles.successDetail}>📍 Location: {locationAddress}</Text>
          <Text style={styles.successDetail}>📋 Department: {department}</Text>
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Motivational Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🌟 Every report counts! Help us improve your community 🌟</Text>
        </View>

        {/* Image Capture */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capture Image *</Text>
          {!photoUri ? (
            <TouchableOpacity style={styles.uploadContainer} onPress={handleCapture}>
              <Camera size={32} color="#2ECC71" />
              <Text style={{ marginTop: 8 }}>Open Camera</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.previewWrapper}>
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeButton} onPress={handleRemovePhoto}>
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location *</Text>
          <View style={styles.addressCard}>
            {locationLoading ? (
              <ActivityIndicator color="#2ECC71" />
            ) : locationError ? (
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#EF4444" }}>Failed to get location</Text>
                <TouchableOpacity onPress={handleRetryLocation}>
                  <RefreshCw size={20} color="#2ECC71" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.locationText}>{locationAddress}</Text>
            )}
          </View>

          <View style={styles.mapContainer}>
            {location && !locationLoading ? (
              <MapView
                ref={mapRef}
                style={styles.map}
                region={{ ...location, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
              >
                <Marker coordinate={location} title="Issue Location" description={locationAddress} />
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <Text>Map Loading...</Text>
              </View>
            )}
          </View>
        </View>

        {/* Submit */}
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!description.trim() || !photoUri || !location) && { backgroundColor: "#9CA3AF" },
            ]}
            onPress={handleSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  banner: {
    backgroundColor: "#2ECC71",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  uploadContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  previewWrapper: { position: "relative", marginTop: 16, alignItems: "center" },
  previewImage: { width: width * 0.88, height: 240, borderRadius: 16 },
  removeButton: { position: "absolute", top: 12, right: 12, backgroundColor: "rgba(0,0,0,0.8)", borderRadius: 20, padding: 8 },
  removeButtonText: { color: "#fff", fontSize: 16 },
  textInput: { backgroundColor: "#F9FAFB", borderRadius: 12, padding: 16, minHeight: 120, textAlignVertical: "top" },
  addressCard: { backgroundColor: "#F3F4F6", borderRadius: 12, padding: 12, marginBottom: 12 },
  locationText: { fontSize: 14, color: "#374151" },
  mapContainer: { height: 220, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#E5E7EB" },
  map: { width: "100%", height: "100%" },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  submitButton: { backgroundColor: "#2ECC71", paddingVertical: 16, borderRadius: 16, alignItems: "center" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32 },
  successTitle: { fontSize: 24, fontWeight: "700", color: "#2ECC71", marginTop: 16 },
  successMessage: { fontSize: 16, textAlign: "center", marginVertical: 16 },
  successDetail: { fontSize: 14, color: "#374151", marginBottom: 8 },
});

export default ReportIssuePage;
