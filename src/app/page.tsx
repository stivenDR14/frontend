"use client";

import { useState, useEffect } from "react";
import { UseRealtimeChat } from "./hooks/use-realtime-chat.hook";
import SessionSelector from "@/components/session-selector";
import { useManageSessionId } from "./hooks/use-manage-session-id";
import SessionModal from "@/components/session-modal";
import InputErrorContainer from "@/components/input-error-container";
import ChatHistory from "@/components/chat-history";
import Stepper from "@/components/stepper";

export default function Home() {
  const [query, setQuery] = useState("");
  const [responseChunks, setResponseChunks] = useState<string>("");
  const [toolUses, setToolUses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolOutputs, setToolOutputs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);

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

    connect();
  };

  // update the loading state when the streaming is finished
  useEffect(() => {
    if (!isStreaming && isLoading) {
      setIsLoading(false);
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

  const headerDiv = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">SuperCar Assistant</h1>
          <SessionSelector
            sessionIds={sessionIds}
            currentSessionId={sessionId}
            onSelectSession={selectSessionId}
            onAddNewSession={addNewSession}
          />
        </div>
        {showGreeting && (
          <div className="mb-4 p-3 bg-success-500/20 text-success-500 rounded animate-fade-in">
            ¡Welcome again, {userName}!
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      {headerDiv()}

      <InputErrorContainer
        handleSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        isStreaming={isStreaming}
        error={error}
      />
      <ChatHistory
        responseChunks={responseChunks}
        toolUses={toolUses}
        toolOutputs={toolOutputs}
      />
      <Stepper />
      <SessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleNameSubmit}
        isFirstTime={isFirstTimeUser}
      />
    </div>
  );
}
