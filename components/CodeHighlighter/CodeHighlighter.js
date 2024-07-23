// src/components/CodeHighlighter/CodeHighlighter.js
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CodeHighlighter from "react-native-code-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

const CodeHighlighterComponent = ({ language, code }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Toast.show({
      type: "success",
      text1: "Code copied",
      text2: "The code has been copied to clipboard",
      position: "top",
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.codeHighlighterContainer}>
      <CodeHighlighter
        containerStyle={styles.codeContainer}
        hljsStyle={nightOwl}
        language={language}>
        {code}
      </CodeHighlighter>
      <TouchableOpacity
        style={styles.copyButton}
        onPress={copyToClipboard}>
        <AntDesign
          name="copy1"
          size={20}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  codeHighlighterContainer: {
    marginVertical: 10,
    borderRadius: 8,
    position: "relative",
  },
  codeContainer: {
    padding: 10,
    width: "100%",
  },
  copyButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
  },
});

export default CodeHighlighterComponent;
