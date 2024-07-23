import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useChatContext } from "../../utils/ChatContext";
import { useChatActions } from "../../utils/useChatActions";

const ChatHistory = () => {
  const { isHistoryVisible, history, setIsHistoryVisible } = useChatContext();
  const { handleSelectChat, handleDeleteChat } = useChatActions();
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) setIsHistoryVisible(false);
    },
    [setIsHistoryVisible]
  );

  const confirmDeleteChat = (chatId) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => handleDeleteChat(chatId),
        style: "destructive",
      },
    ]);
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => {
        handleSelectChat(item.id);
        bottomSheetRef.current?.close();
      }}>
      <Text
        style={styles.historyItemText}
        numberOfLines={2}>
        {item.messages[1]?.content || "Empty chat"}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDeleteChat(item.id)}>
        <Ionicons
          name="trash-outline"
          size={20}
          color="#FF3B30"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isHistoryVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat History</Text>
        </View>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.historyList}
          />
        ) : (
          <Text style={styles.emptyHistoryText}>No chat history yet</Text>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  emptyHistoryText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  bottomSheetBackground: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "#3A3A3C",
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  historyList: {
    paddingHorizontal: 16,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  historyItemText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 8,
  },
});

export default ChatHistory;
