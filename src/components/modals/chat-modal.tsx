"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ChatHistory from "../chat-history";
import { ChatSteps } from "@/app/models";
import InputErrorContainer from "../input-error-container";

export default function ChatModal({
  isOpen,
  entireQuery,
  responseChunks,
  toolUses,
  toolOutputs,
  sessionId,
  isStreaming,
  setSteps,
  setQuery,
  setIsLoading,
  setResponseChunks,
  setToolUses,
  setToolOutputs,
  setError,
  setEntireQuery,
  connect,
  steps,
  handleSubmit,
  query,
  isLoading,
  error,
  setIsOpen,
}: {
  isOpen: boolean;
  entireQuery: string;
  responseChunks: string;
  toolUses: string[];
  toolOutputs: string[];
  sessionId: string;
  isStreaming: boolean;
  setSteps: Dispatch<SetStateAction<ChatSteps>>;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setResponseChunks: Dispatch<SetStateAction<string>>;
  setToolUses: Dispatch<SetStateAction<string[]>>;
  setToolOutputs: Dispatch<SetStateAction<string[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setEntireQuery: Dispatch<SetStateAction<string>>;
  connect: () => void;
  steps: ChatSteps;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  query: string;
  isLoading: boolean;
  error: string | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Manejar clics fuera del modal para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Añadir el evento solo cuando el modal está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={`fixed right-0 top-[10%] h-[80%] w-[90%] md:w-[40%] z-50 bg-primary-light dark:bg-primary-dark shadow-xl rounded-l-lg transition-transform duration-300 ease-in-out border-foreground-light dark:border-foreground-dark ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="mb-2 pb-2 border-b border-foreground-light dark:border-foreground-dark flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark">
            Chat Assistant
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground-light dark:text-foreground-dark hover:text-secondary-light dark:hover:text-secondary-dark"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Contenedor del historial de chat */}
        <div className="flex-1 overflow-hidden mb-4">
          <ChatHistory
            userMessage={entireQuery}
            responseChunks={responseChunks}
            toolUses={toolUses}
            toolOutputs={toolOutputs}
            sessionId={sessionId}
            isStreaming={isStreaming}
            setSteps={setSteps}
            submitInput={(subquery: string) => {
              const newQuery = `For tomorrow at ${subquery} would be nice to have a reservation`;
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

        <div className="mt-auto">
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
    </div>
  );
}
