import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HistoryButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.historyButton}
    onPress={onPress}>
    <Ionicons
      name="time-outline"
      size={20}
      color="#FFFFFF"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 4,
  },
});

export default HistoryButton;
