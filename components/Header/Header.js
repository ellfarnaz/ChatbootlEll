import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModelSelector from "./ModelSelector";
import NewChatButton from "./NewChatButton";
import HistoryButton from "./HistoryButton";
import { useChatContext } from "../../utils/ChatContext";
import { useChatActions } from "../../utils/useChatActions";

const Header = () => {
  const { selectedModel, setSelectedModel } = useChatContext();
  const { handleNewChat, handleShowHistory, handleClearChat } =
    useChatActions();

  const confirmClearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear the current chat?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: handleClearChat,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.header}>
      <ModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <View style={styles.containerBlue}>
        <NewChatButton onPress={handleNewChat} />
        <HistoryButton onPress={handleShowHistory} />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={confirmClearChat}>
          <Ionicons
            name="trash-outline"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: -10,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 4,
  },
  containerBlue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default Header;
