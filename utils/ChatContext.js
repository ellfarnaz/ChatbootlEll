import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "I'm Elle, nice to meet you! What's on your mind today? Do you have a specific question or topic you'd like to chat about? I'm all ears! 👂",
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("mixtral-8x7b-32768");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const value = {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    selectedModel,
    setSelectedModel,
    isHistoryVisible,
    setIsHistoryVisible,
    history,
    setHistory,
    currentChatId,
    setCurrentChatId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
