import { useCallback } from "react";
import { useChatContext, INITIAL_MESSAGE } from "./ChatContext";
import { sendMessage } from "./apiService";
import { Keyboard } from "react-native";

export const useChatActions = () => {
  const {
    messages,
    setMessages,
    setIsLoading,
    selectedModel,
    setIsHistoryVisible,
    history,
    setHistory,
    currentChatId,
    setCurrentChatId,
  } = useChatContext();

  const handleSubmit = useCallback(
    async (input) => {
      if (!input.trim()) return;

      const userMessage = { role: "user", content: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsLoading(true);

      try {
        const botMessage = await sendMessage(
          messages,
          userMessage,
          selectedModel
        );
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, botMessage];

          // Update or create chat history
          if (currentChatId) {
            setHistory((prevHistory) =>
              prevHistory.map((chat) =>
                chat.id === currentChatId
                  ? { ...chat, messages: newMessages }
                  : chat
              )
            );
          } else {
            const newChatId = Date.now().toString();
            setCurrentChatId(newChatId);
            setHistory((prevHistory) => [
              { id: newChatId, messages: newMessages },
              ...prevHistory,
            ]);
          }

          return newMessages;
        });
      } catch (error) {
        const errorMessage = {
          role: "assistant",
          content: `Sorry, this model cannot be used, please use another model... 😊 😊`,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      messages,
      selectedModel,
      setMessages,
      setIsLoading,
      currentChatId,
      setCurrentChatId,
      setHistory,
    ]
  );

  const handleNewChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentChatId(null);
  }, [setMessages, setCurrentChatId]);

  const handleSelectChat = useCallback(
    (chatId) => {
      const selectedChat = history.find((chat) => chat.id === chatId);
      if (selectedChat) {
        setMessages(selectedChat.messages);
        setCurrentChatId(chatId);
      }
      setIsHistoryVisible(false);
    },
    [history, setMessages, setCurrentChatId, setIsHistoryVisible]
  );

  const handleDeleteChat = useCallback(
    (chatId) => {
      setHistory((prevHistory) =>
        prevHistory.filter((chat) => chat.id !== chatId)
      );
      if (currentChatId === chatId) {
        setMessages([INITIAL_MESSAGE]);
        setCurrentChatId(null);
      }
    },
    [currentChatId, setHistory, setMessages, setCurrentChatId]
  );

  const handleClearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    if (currentChatId) {
      setHistory((prevHistory) =>
        prevHistory.filter((chat) => chat.id !== currentChatId)
      );
      setCurrentChatId(null);
    }
  }, [currentChatId, setMessages, setHistory, setCurrentChatId]);

  const handleShowHistory = useCallback(() => {
    Keyboard.dismiss();
    setIsHistoryVisible(true);
  }, [setIsHistoryVisible]);

  return {
    handleSubmit,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
    handleClearChat,
    handleShowHistory,
  };
};
