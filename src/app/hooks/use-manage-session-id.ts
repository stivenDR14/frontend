"use client";

import { useState, useEffect } from "react";

interface UseManageSessionIdReturn {
  sessionId: string;
  userName: string;
  isFirstTimeUser: boolean;
  showModal: boolean;
  sessionIds: string[];
  setShowModal: (show: boolean) => void;
  handleNameSubmit: (name: string) => void;
  selectSessionId: (id: string) => void;
  addNewSession: () => void;
}

export const useManageSessionId = (): UseManageSessionIdReturn => {
  const [sessionId, setSessionId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sessionIds, setSessionIds] = useState<string[]>([]);

  // Initialize the session id and user name
  useEffect(() => {
    // Check if it's the first time the user visits the app
    const firstTimeUser = localStorage.getItem("first-time-user") === null;
    setIsFirstTimeUser(firstTimeUser);

    // If it's the first time, show the modal
    if (firstTimeUser) {
      setShowModal(true);
      localStorage.setItem("first-time-user", "false");
    } else {
      // Load saved sessions
      const savedSessions = localStorage.getItem("session-ids");
      const sessions = savedSessions ? JSON.parse(savedSessions) : [];
      setSessionIds(sessions);

      // Use the last session as default
      if (sessions.length > 0) {
        setSessionId(sessions[0]);
        // Extract the user name from the session id
        const namePart = sessions[0].split("-")[0];
        setUserName(namePart);
      } else {
        // If there are no saved sessions (rare case), show the modal
        setShowModal(true);
      }
    }
  }, []);

  // Handle the name submission
  const handleNameSubmit = (name: string) => {
    if (!name.trim()) return;

    // Create a new session id with the name and a random suffix
    const newSessionId = `${name}-${Math.random().toString(36).substring(7)}`;

    // Update the state
    setSessionId(newSessionId);
    setUserName(name);
    setShowModal(false);

    // Save in localStorage
    const updatedSessions = [newSessionId, ...sessionIds];
    setSessionIds(updatedSessions);
    localStorage.setItem("session-ids", JSON.stringify(updatedSessions));
  };

  // Select an existing session id
  const selectSessionId = (id: string) => {
    setSessionId(id);
    // Extract the user name from the session id
    const namePart = id.split("-")[0];
    setUserName(namePart);
  };

  // Add a new session
  const addNewSession = () => {
    setShowModal(true);
  };

  return {
    sessionId,
    userName,
    isFirstTimeUser,
    showModal,
    sessionIds,
    setShowModal,
    handleNameSubmit,
    selectSessionId,
    addNewSession,
  };
};
