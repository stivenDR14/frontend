"use client";

import { useState, useEffect } from "react";
import { UseRealtimeChat } from "./hooks/use-realtime-chat.hook";
import SessionSelector from "@/components/session-selector";
import { useManageSessionId } from "./hooks/use-manage-session-id";
import SessionModal from "@/components/session-modal";
import InputErrorContainer from "@/components/input-error-container";
import ChatHistory from "@/components/chat-history";
import Stepper from "@/components/stepper";
import { ChatSteps } from "./models";

export default function Home() {
  const [query, setQuery] = useState("");
  const [responseChunks, setResponseChunks] = useState<string>("");
  const [toolUses, setToolUses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolOutputs, setToolOutputs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [entireQuery, setEntireQuery] = useState<string>("");
  const [steps, setSteps] = useState<ChatSteps>({
    get_weather: { done: false, output: "" },
    get_dealership_address: { done: false, output: "" },
    check_appointment_availability: { done: false, output: "" },
    schedule_appointment: { done: false, output: "" },
  });

  const {
    sessionId,
    userName,
    isFirstTimeUser,
    showModal,
    sessionIds,
    setShowModal,
    handleNameSubmit,
    selectSessionId,
    addNewSession,
  } = useManageSessionId();

  const { connect } = UseRealtimeChat(
    setError,
    setIsStreaming,
    setResponseChunks,
    setToolUses,
    setToolOutputs,
    sessionId,
    query
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    // reset the states
    setIsLoading(true);
    setResponseChunks("");
    setToolUses([]);
    setToolOutputs([]);
    setError(null);
    setEntireQuery(query);
    connect();
  };

  // update the loading state when the streaming is finished
  useEffect(() => {
    if (!isStreaming && isLoading) {
      setIsLoading(false);
      //empty the input
      setQuery("");
    }
  }, [isStreaming, isLoading]);

  useEffect(() => {
    setShowGreeting(true);
    const timer = setTimeout(() => {
      setShowGreeting(false);
      console.log("showGreeting", showGreeting);
    }, 5500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Header = () => (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold w-full">SuperCar Assistant</h1>
      <h2 className="text-sm text-gray-500">User selected:</h2>
      <SessionSelector
        sessionIds={sessionIds}
        currentSessionId={sessionId}
        onSelectSession={selectSessionId}
        onAddNewSession={addNewSession}
      />
    </div>
  );

  return (
    <div className="h-screen max-w-7xl mx-auto p-4 flex flex-col md:flex-row md:gap-6">
      {/* Left column (mobile: entire screen in vertical order) */}
      <div className="flex flex-col h-full md:w-2/3 order-1 md:order-1">
        {/* In mobile: Header above, Chat in the middle, Input below */}
        {/* In desktop: Header above, Input in the middle, Chat below */}
        <div className="order-1">
          <Header />
        </div>

        <div className="flex-1 overflow-auto order-2 md:order-3">
          <ChatHistory
            userMessage={entireQuery}
            responseChunks={responseChunks}
            toolUses={toolUses}
            toolOutputs={toolOutputs}
            sessionId={sessionId}
            isStreaming={isStreaming}
            setSteps={setSteps}
            submitInput={(subquery: string) => {
              const newQuery = `Could be at ${subquery}`;
              setQuery(newQuery);
              // reset the states
              setIsLoading(true);
              setResponseChunks("");
              setToolUses([]);
              setToolOutputs([]);
              setError(null);
              setEntireQuery(newQuery);
              connect();
            }}
            steps={steps}
          />
        </div>

        <div className="mt-auto order-3 md:order-2 md:my-4 ">
          <InputErrorContainer
            handleSubmit={handleSubmit}
            query={query}
            setQuery={setQuery}
            isLoading={isLoading}
            isStreaming={isStreaming}
            error={error}
          />
        </div>
      </div>

      {/* Right column just available in desktop */}
      <div className="flex justify-center items-center md:w-1/3 order-2 md:order-2 mt-4 md:mt-0">
        <Stepper
          showGreeting={showGreeting}
          userName={userName}
          steps={steps}
        />
      </div>

      <SessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleNameSubmit}
        isFirstTime={isFirstTimeUser}
      />
    </div>
  );
}
