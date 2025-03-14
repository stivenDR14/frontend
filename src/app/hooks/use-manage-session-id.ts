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

  // Inicializar al montar el componente
  useEffect(() => {
    // Verificar si es la primera vez que el usuario visita la app
    const firstTimeUser = localStorage.getItem("first-time-user") === null;
    setIsFirstTimeUser(firstTimeUser);

    // Si es la primera vez, mostrar el modal
    if (firstTimeUser) {
      setShowModal(true);
      localStorage.setItem("first-time-user", "false");
    } else {
      // Cargar sesiones guardadas
      const savedSessions = localStorage.getItem("session-ids");
      const sessions = savedSessions ? JSON.parse(savedSessions) : [];
      setSessionIds(sessions);

      // Usar la última sesión como predeterminada
      if (sessions.length > 0) {
        setSessionId(sessions[0]);
        // Extraer el nombre de usuario del ID de sesión
        const namePart = sessions[0].split("-")[0];
        setUserName(namePart);
      } else {
        // Si no hay sesiones guardadas (caso raro), mostrar el modal
        setShowModal(true);
      }
    }
  }, []);

  // Manejar el envío del nombre
  const handleNameSubmit = (name: string) => {
    if (!name.trim()) return;

    // Crear un nuevo ID de sesión con el nombre y un sufijo aleatorio
    const newSessionId = `${name}-${Math.random().toString(36).substring(7)}`;

    // Actualizar el estado
    setSessionId(newSessionId);
    setUserName(name);
    setShowModal(false);

    // Guardar en localStorage
    const updatedSessions = [newSessionId, ...sessionIds];
    setSessionIds(updatedSessions);
    localStorage.setItem("session-ids", JSON.stringify(updatedSessions));
  };

  // Seleccionar un ID de sesión existente
  const selectSessionId = (id: string) => {
    setSessionId(id);
    // Extraer el nombre de usuario del ID de sesión
    const namePart = id.split("-")[0];
    setUserName(namePart);
  };

  // Añadir una nueva sesión
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
