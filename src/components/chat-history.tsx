import { useChatHistory } from "@/app/hooks/use-chat-history";
import { ChatSteps } from "@/app/models";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { STEP_COMPONENTS } from "./stepper";
import { BotAvatar, UserAvatar } from "@/app/constants/svg";

export default function ChatHistory({
  responseChunks,
  userMessage,
  toolUses,
  toolOutputs,
  sessionId,
  isStreaming,
  setSteps,
  steps,
  submitInput,
}: {
  responseChunks: string;
  userMessage: string;
  toolUses: string[];
  toolOutputs: string[];
  sessionId: string;
  isStreaming: boolean;
  setSteps: Dispatch<SetStateAction<ChatSteps>>;
  steps: ChatSteps;
  submitInput: (subquery: string) => void;
}) {
  const { chatHistory, addUserMessage, addAssistantMessage } = useChatHistory(
    sessionId,
    setSteps,
    steps
  );

  // local state to handle streaming message
  const [displayedMessages, setDisplayedMessages] = useState<
    typeof chatHistory
  >([]);
  const [streamingMessage, setStreamingMessage] = useState("");

  // update user message when it changes
  useEffect(() => {
    if (userMessage && userMessage.trim() !== "") {
      addUserMessage(userMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMessage]);

  // handle streaming and assistant message completion
  useEffect(() => {
    if (isStreaming) {
      // during streaming, update the message in real time
      setStreamingMessage(responseChunks);
    } else if (responseChunks && responseChunks.trim() !== "") {
      // when streaming ends, save the full message
      setStreamingMessage("");
      addAssistantMessage(responseChunks, toolUses, toolOutputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseChunks, isStreaming]);

  // update the displayed messages when the chat history changes
  useEffect(() => {
    setDisplayedMessages(chatHistory);

    const timeout = setTimeout(() => {
      //make scroll to the bottom of the chat history
      const chatHistoryElement = document.getElementById(
        "last-item-chat-history"
      );
      if (chatHistoryElement) {
        chatHistoryElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(chatHistory)]);

  return (
    <div className="h-99/100 overflow-auto border rounded p-4 pb-16 border-foreground-light dark:border-foreground-dark">
      {/* Show chat history */}
      {displayedMessages.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {displayedMessages.map((message, index) => (
            <div
              key={index}
              id={
                index === displayedMessages.length - 1
                  ? "last-item-chat-history"
                  : ""
              }
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } items-end`}
            >
              {message.type === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-foreground-light dark:text-foreground-dark flex-shrink-0 mr-2">
                  <BotAvatar />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-secondary-light dark:bg-secondary-dark text-foreground-dark dark:text-foreground-dark rounded-br-none mb-4 mr-1"
                    : "bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark rounded-bl-none mb-4"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.message}
                  {/* Writing indicator for the last assistant message during streaming */}
                  {isStreaming &&
                    index === displayedMessages.length - 1 &&
                    message.type === "assistant" && (
                      <span className="inline-block ml-1 animate-pulse">▌</span>
                    )}
                </div>

                {/* Show tool badge if exists */}
                {message.type === "assistant" &&
                  message.tool_by_assistant_name &&
                  message.tool_by_assistant_name.length > 0 && (
                    <div className="mt-2 flex-column items-center">
                      <span className="inline-flex whitespace-normal break-words xs:max-w-[150px] md:max-w-[200px]  items-center px-2 py-1 text-xs font-small rounded-full bg-primary-light dark:bg-primary-dark text-foreground-light dark:text-foreground-dark mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4a1 1 0 111.414 1.414l-1 1a1 1 0 01-1.414 0l-.707-.707-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414-.707-.707A1 1 0 0112 2zm.707 10.293a1 1 0 00-1.414 0l-.707.707-1.414-1.414a1 1 0 00-1.414 1.414l1.414 1.414-.707.707a1 1 0 101.414 1.414l.707-.707 1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414.707-.707a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <ul>
                          {message.tool_by_assistant_name &&
                            message.tool_by_assistant_name.map(
                              (tool, index) => {
                                return (
                                  <li key={`tool-${index}`}>
                                    <span
                                      style={{ margin: "0 0.25rem 0 0.25rem" }}
                                    >
                                      {tool}
                                    </span>
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </span>
                      {message.tool_by_assistant_output &&
                        message.tool_by_assistant_name &&
                        message.tool_by_assistant_output.map(
                          (output, index) => {
                            const StepComponent =
                              STEP_COMPONENTS[
                                message.tool_by_assistant_name![
                                  index
                                ] as keyof typeof STEP_COMPONENTS
                              ];

                            return (
                              <div key={`tool-description-${index}`}>
                                {StepComponent(
                                  false,
                                  output,
                                  (selectedTime: string) => {
                                    submitInput(selectedTime);
                                  }
                                )}
                              </div>
                            );
                          }
                        )}
                    </div>
                  )}
              </div>

              {message.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary-light dark:bg-secondary-dark flex items-center justify-center text-foreground-light dark:text-foreground-dark flex-shrink-0 mr-2">
                  <UserAvatar />
                </div>
              )}
            </div>
          ))}
          {streamingMessage && (
            <div className="flex justify-start items-end">
              <BotAvatar />
              <div className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark rounded-lg rounded-bl-none p-3 max-w-[80%]">
                {streamingMessage}
                <span className="inline-block ml-1 animate-pulse">▌</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Here is your chat history</p>
      )}

      {/* Show tools used */}
      {toolUses.length > 0 && responseChunks === "" && !isStreaming && (
        <div className="mt-4 p-3 bg-gray-800 text-white rounded">
          <h3 className="font-bold mb-2">Tools Used:</h3>
          <ul className="list-disc pl-5">
            {toolUses.map((tool, index) => (
              <li key={`tool-${index}`} className="mb-1">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show tool results */}
      {toolOutputs.length > 0 && responseChunks === "" && !isStreaming && (
        <div className="mt-4 p-3 bg-gray-800 text-white rounded">
          <h3 className="font-bold mb-2">Tool Results:</h3>
          <ul className="list-disc pl-5">
            {toolOutputs.map((output, index) => (
              <li key={`output-${index}`} className="mb-1">
                {typeof output === "string" && output.startsWith("{")
                  ? JSON.parse(output).output
                  : output}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
