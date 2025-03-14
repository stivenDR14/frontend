export interface IEvent {
  type: string;
  content: string;
}

// Define types for the chat history
export interface ChatMessage {
  type: "user" | "assistant";
  message: string;
  tool_by_assistant_name?: string[];
  tool_by_assistant_output?: string[];
}

export interface StepsItem {
  done: boolean;
  output: string;
}

export interface ChatSteps {
  get_weather: StepsItem;
  get_dealership_address: StepsItem;
  check_appointment_availability: StepsItem;
  schedule_appointment: StepsItem;
}

export interface SessionChatData {
  history: ChatMessage[];
  steps: ChatSteps;
}

export interface ChatHistoryStore {
  [sessionId: string]: SessionChatData;
}
