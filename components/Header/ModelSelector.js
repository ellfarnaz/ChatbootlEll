import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Modal, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const models = [
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
  { id: "llama3-70b-8192", name: "LLaMA2 70B" },
  { id: "llama3-8b-8192", name: "LLaMA3 8B" },
  { id: "lgemma2-9b-it", name: "Gemma 9B" },
  { id: "gemma-7b-it", name: "Gemma 7B" },
];

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.modelSelector}
        onPress={() => setIsModalVisible(true)}>
        <Text style={styles.modelSelectorText}>
          {models.find((m) => m.id === selectedModel)?.name || "Select Model"}
        </Text>
        <AntDesign
          name="down"
          size={16}
          color="#FFFFFF"
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Model</Text>
            {models.map((model) => (
              <TouchableOpacity
                key={model.id}
                style={styles.modelOption}
                onPress={() => {
                  setSelectedModel(model.id);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.modelOptionText}>{model.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modelSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3A3C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modelSelectorText: {
    color: "#FFFFFF",
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#2C2C2E",
    borderRadius: 20,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  modelOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  modelOptionText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  closeModalButton: {
    marginTop: 16,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default ModelSelector;
