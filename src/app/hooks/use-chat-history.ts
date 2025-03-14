"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ChatHistoryStore, ChatMessage, ChatSteps } from "../models";

export const useChatHistory = (
  sessionId: string,
  setSteps: Dispatch<SetStateAction<ChatSteps>>,
  steps: ChatSteps
) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load chat history from localStorage when the component is mounted
  useEffect(() => {
    if (!sessionId) return;

    const loadChatHistory = () => {
      const storedData = localStorage.getItem("chat_history");
      if (storedData) {
        try {
          const parsedData: ChatHistoryStore = JSON.parse(storedData);
          if (parsedData[sessionId]) {
            setChatHistory(parsedData[sessionId].history || []);
            setSteps(
              parsedData[sessionId].steps || {
                get_weather: { done: false, output: "" },
                get_dealership_address: { done: false, output: "" },
                check_appointment_availability: { done: false, output: "" },
                schedule_appointment: { done: false, output: "" },
              }
            );
          } else {
            setChatHistory([]);
            setSteps({
              get_weather: { done: false, output: "" },
              get_dealership_address: { done: false, output: "" },
              check_appointment_availability: { done: false, output: "" },
              schedule_appointment: { done: false, output: "" },
            });
          }
        } catch (error) {
          console.error("Error parsing chat history:", error);
        }
      }
    };

    loadChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Save user message
  const addUserMessage = (message: string) => {
    const newMessage: ChatMessage = {
      type: "user",
      message,
    };

    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    saveToLocalStorage(updatedHistory, steps);
  };

  // Save assistant message
  const addAssistantMessage = (
    message: string,
    toolName?: string[],
    toolOutput?: string[]
  ) => {
    const newMessage: ChatMessage = {
      type: "assistant",
      message,
      ...(toolName && { tool_by_assistant_name: toolName }),
      ...(toolOutput && { tool_by_assistant_output: toolOutput }),
    };

    const auxSteps = { ...steps };
    if (toolName && toolOutput) {
      toolName.forEach((name, index) => {
        updateStep(name as keyof ChatSteps, true, toolOutput[index]);
        auxSteps[name as keyof ChatSteps] = {
          done: true,
          output: toolOutput[index],
        };
      });
    }

    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    saveToLocalStorage(updatedHistory, auxSteps);
  };

  // Update step state
  const updateStep = (
    stepName: keyof ChatSteps,
    value: boolean,
    output?: string
  ) => {
    const updatedSteps = { ...steps, [stepName]: { done: value, output } };
    setSteps(updatedSteps);
    saveToLocalStorage(chatHistory, updatedSteps);
  };

  // Save to localStorage
  const saveToLocalStorage = (
    history: ChatMessage[],
    currentSteps: ChatSteps
  ) => {
    try {
      // Get existing data or initialize
      const storedData = localStorage.getItem("chat_history");
      const chatStore: ChatHistoryStore = storedData
        ? JSON.parse(storedData)
        : {};

      // Update data for the current session
      chatStore[sessionId] = {
        history,
        steps: currentSteps,
      };

      // Save to localStorage
      localStorage.setItem("chat_history", JSON.stringify(chatStore));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  return {
    chatHistory,
    steps,
    addUserMessage,
    addAssistantMessage,
    updateStep,
  };
};
