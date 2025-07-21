import axios from "axios";

export const fetchCoinChatResponse = async (userPrompt) => {
  try {
    const response = await axios.post("http://localhost:5454/ai/chat", {
      prompt: userPrompt,
    });

    const responseText =
      typeof response.data === "string"
        ? response.data
        : response.data?.text || response.data?.message || "No response";

    if (
      responseText.includes("functionCall") ||
      responseText.includes("JSONObject") ||
      responseText.includes("not found")
    ) {
      return {
        type: "bot",
        text: "not found",
      };
    }

    return {
      type: "bot",
      text: responseText,
    };
  } catch (error) {
    // Gracefully catch all errors and map them to "not found" or generic error
    const errorMessage =
      error?.response?.data?.message || error.message || "Error";

    if (
      errorMessage.includes("functionCall") ||
      errorMessage.includes("JSONObject") ||
      errorMessage.includes("not found")
    ) {
      return {
        type: "bot",
        text: "not found",
      };
    }

    return {
      type: "bot",
      text: "Error: " + errorMessage,
    };
  }
};
