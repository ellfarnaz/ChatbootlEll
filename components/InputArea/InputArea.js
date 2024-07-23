// src/components/InputArea/InputArea.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputArea = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState("");
  const [keyboardPadding] = useState(new Animated.Value(25));

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        Animated.timing(keyboardPadding, {
          toValue: 10,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        Animated.timing(keyboardPadding, {
          toValue: 25,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <Animated.View
      style={[styles.inputContainer, { paddingBottom: keyboardPadding }]}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ketik pesan..."
        placeholderTextColor="#8E8E93"
        multiline
        keyboardAppearance="dark"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        style={styles.sendButton}>
        <Ionicons
          name="send"
          size={24}
          color={isLoading ? "#8E8E93" : "#007AFF"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#2C2C2E",
    borderTopWidth: 1,
    borderTopColor: "#3A3A3C",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#FFFFFF",
    maxHeight: 250,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default InputArea;
