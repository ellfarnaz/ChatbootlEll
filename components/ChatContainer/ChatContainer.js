import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import MessageList from "../MessageList/MessageList";
import InputArea from "../InputArea/InputArea";
import { useChatContext } from "../../utils/ChatContext";
import { useChatActions } from "../../utils/useChatActions";

const ChatContainer = () => {
  const { messages, isLoading } = useChatContext();
  const { handleSubmit } = useChatActions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <MessageList
        messages={messages}
        isLoading={isLoading}
      />
      <InputArea
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatContainer;
