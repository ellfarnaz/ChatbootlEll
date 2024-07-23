import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator
      size="large"
      color="#007AFF"
    />
    <Text style={styles.loadingText}>AI is thinking...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingIndicator;
