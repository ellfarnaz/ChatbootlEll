import React, { useRef, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MessageItem from "./MessageItem";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const MessageList = ({ messages, isLoading }) => {
  const flatListRef = useRef(null);
  const prevMessagesLengthRef = useRef(messages.length);

  useEffect(() => {
    if (
      flatListRef.current &&
      (messages.length > prevMessagesLengthRef.current || isLoading)
    ) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, isLoading]);

  const renderItem = ({ item }) => <MessageItem message={item} />;

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.messageList}
      ListFooterComponent={renderFooter}
      onContentSizeChange={() => {
        if (isLoading) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  messageList: {
    paddingBottom: 20,
  },
  loadingContainer: {
    paddingTop: 20,
  },
});

export default MessageList;
