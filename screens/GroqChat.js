import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../components/Header/Header";
import ChatContainer from "../components/ChatContainer/ChatContainer";
import ChatHistory from "../components/ChatHistory/ChatHistory";
import { ChatProvider } from "../utils/ChatContext";

export default function GroqChat() {
  return (
    <ChatProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}>
            <Header />
            <ChatContainer />
            <ChatHistory />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ChatProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
});
