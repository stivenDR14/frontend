"use client";

import { useState, useEffect } from "react";
import { UseRealtimeChat } from "./hooks/use-realtime-chat.hook";
import SessionSelector from "@/components/session-selector";
import { useManageSessionId } from "./hooks/use-manage-session-id";
import Stepper from "@/components/stepper";
import { ChatSteps } from "./models";
import ThemeToggle from "@/components/theme-toggle";
import ChatToggle from "@/components/chat-toogle";
import ChatModal from "@/components/modals/chat-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/modals/dialog";
import OnboardingModal from "@/components/modals/onboarding-modal";
import Loader from "@/components/loader";

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
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    sessionId,
    userName,
    isFirstTimeUser,
    showModal,
    sessionIds,
    setShowModal,
    handleNameSubmit,
    selectSessionId,
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
    setEntireQuery(newQuery);
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
      //empty the input
      setQuery("");
      setEntireQuery("");
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

  // Handle new user creation
  const handleNewUser = () => {
    setIsUserFormOpen(true);
    setDialogOpen(false);
  };

  const HeaderButton = () => (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark px-4 py-2 rounded-md shadow-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-all duration-300">
          <p className="text-sm">Access</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-primary-light dark:bg-primary-dark border-foreground-light dark:border-foreground-dark">
        <DialogHeader>
          <DialogTitle className="text-foreground-light dark:text-foreground-dark">
            Choose a user
          </DialogTitle>
          <DialogDescription className="text-foreground-light/80 dark:text-foreground-dark/80">
            Select an existing user or create a new one to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <SessionSelector
            sessionIds={sessionIds}
            currentSessionId={sessionId}
            onSelectSession={selectSessionId}
            onAddNewSession={handleNewUser}
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  const Header = () => (
    <div className="flex justify-between items-center mb-4 gap-4">
      <div>
        <HeaderButton />
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
    <div className="h-screen mx-auto p-4 flex flex-col gap-6">
      <Header />
      {/* if it is loading or streaming show a loader in the mid of the screen */}
      {(isLoading || isStreaming) && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}
      <div className="flex justify-center items-center mt-4">
        <Stepper
          showGreeting={showGreeting}
          userName={userName}
          isLoading={isLoading}
          isStreaming={isStreaming}
          steps={steps}
          submitInput={submitInput}
        />
      </div>
      <OnboardingModal
        isUserFormOpen={isUserFormOpen}
        showModal={showModal}
        isFirstTimeUser={isFirstTimeUser}
        setIsUserFormOpen={setIsUserFormOpen}
        setShowModal={setShowModal}
        handleNameSubmit={handleNameSubmit}
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
