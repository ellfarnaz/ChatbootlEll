import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewChatButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.newChatButton}
    onPress={onPress}>
    <Ionicons
      name="add-outline"
      size={20}
      color="#FFFFFF"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 4,
  },
  newChatButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontSize: 14,
  },
});

export default NewChatButton;
