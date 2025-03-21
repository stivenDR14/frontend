"use client";

import { useState, useEffect } from "react";
import { UseRealtimeChat } from "./hooks/use-realtime-chat.hook";
import SessionSelector from "@/components/session-selector";
import { useManageSessionId } from "./hooks/use-manage-session-id";
import SessionModal from "@/components/modals/session-modal";
import Stepper from "@/components/stepper";
import { ChatSteps } from "./models";
import ThemeToggle from "@/components/theme-toggle";
import ChatToggle from "@/components/chat-toogle";
import ChatModal from "@/components/modals/chat-modal";

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
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  const submitInput = (newQuery: string) => {
    setIsChatOpen(true);
    setQuery(newQuery);
    // reset the states
    setIsLoading(true);
    setResponseChunks("");
    setToolUses([]);
    setToolOutputs([]);
    setError(null);
    setEntireQuery(newQuery);
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
    }, 5500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Header = () => (
    <div className="flex justify-between items-center mb-4 gap-4">
      <div>
        {" "}
        <h2 className="text-sm text-primary-dark dark:text-primary-light">
          User selected:
        </h2>
        <SessionSelector
          sessionIds={sessionIds}
          currentSessionId={sessionId}
          onSelectSession={selectSessionId}
          onAddNewSession={addNewSession}
        />
      </div>

      <h1 className="text-2xl font-bold text-primary-dark dark:text-primary-light ">
        SuperCar Scheduler Platform
      </h1>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <div className="h-screen mx-auto p-4 flex flex-col  gap-6 ">
      <Header />
      <div className="flex justify-center items-center mt-4 mt-4">
        <Stepper
          showGreeting={showGreeting}
          userName={userName}
          steps={steps}
          submitInput={submitInput}
        />
      </div>

      <SessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleNameSubmit}
        isFirstTime={isFirstTimeUser}
      />
      <ChatModal
        isOpen={isChatOpen}
        entireQuery={entireQuery}
        responseChunks={responseChunks}
        toolUses={toolUses}
        toolOutputs={toolOutputs}
        sessionId={sessionId}
        isStreaming={isStreaming}
        setSteps={setSteps}
        setQuery={setQuery}
        setIsLoading={setIsLoading}
        setResponseChunks={setResponseChunks}
        setToolUses={setToolUses}
        setToolOutputs={setToolOutputs}
        setError={setError}
        setEntireQuery={setEntireQuery}
        connect={connect}
        steps={steps}
        handleSubmit={handleSubmit}
        query={query}
        isLoading={isLoading}
        error={error}
        setIsOpen={setIsChatOpen}
      />
      <ChatToggle isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
