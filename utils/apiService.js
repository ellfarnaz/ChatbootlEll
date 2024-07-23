const apiUrl = process.env.EXPO_PUBLIC_GROQ_API_URL;
const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const sendMessage = async (messages, userMessage, selectedModel) => {
  try {
    if (!apiUrl || !apiKey) {
      throw new Error("API URL atau API Key tidak tersedia");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        model: selectedModel,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return {
        role: "assistant",
        content: data.choices[0].message.content,
      };
    } else {
      throw new Error("Respons tidak sesuai format yang diharapkan");
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};
