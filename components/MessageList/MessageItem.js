// src/components/MessageList/MessageItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CodeHighlighter from "../CodeHighlighter/CodeHighlighter";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

const MessageItem = ({ message }) => {
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Toast.show({
      type: "success",
      text1: "Message copied",
      text2: "The message has been copied to clipboard",
      position: "top",
      visibilityTime: 2000,
    });
  };

  const renderMessageContent = (content) => {
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <Text
            key={lastIndex}
            style={styles.messageText}>
            {content.slice(lastIndex, match.index)}
          </Text>
        );
      }

      const language = match[1] || "javascript";
      const code = match[2].trim();

      parts.push(
        <CodeHighlighter
          key={match.index}
          language={language}
          code={code}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(
        <Text
          key={lastIndex}
          style={styles.messageText}>
          {content.slice(lastIndex)}
        </Text>
      );
    }

    return parts;
  };

  return (
    <View style={styles.messageContainer}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {message.role === "user" ? "U" : "AI"}
        </Text>
      </View>
      <View style={[styles.messageBubble, { flex: 1 }]}>
        {renderMessageContent(message.content)}
        {message.role === "assistant" && (
          <TouchableOpacity
            style={styles.copyFullOutputButton}
            onPress={() => copyToClipboard(message.content)}>
            <Ionicons
              name="copy-outline"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4A4A4A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: "90%",
    backgroundColor: "#2C2C2E",
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 22,
  },
  copyFullOutputButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
    marginTop: 10,
  },
});

export default MessageItem;
