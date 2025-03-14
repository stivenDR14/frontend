"use client";

import { useState, useRef, useEffect } from "react";

interface SessionSelectorProps {
  sessionIds: string[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onAddNewSession: () => void;
}

export default function SessionSelector({
  sessionIds,
  currentSessionId,
  onSelectSession,
  onAddNewSession,
}: SessionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extraer el nombre de usuario del ID de sesión
  const getUserNameFromSessionId = (id: string) => {
    return id.split("-")[0];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
      >
        <span>{getUserNameFromSessionId(currentSessionId)}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-secondary-800 rounded shadow-lg z-10 border dark:border-secondary-700">
          <ul className="py-1">
            {sessionIds.map((id) => (
              <li key={id}>
                <button
                  onClick={() => {
                    onSelectSession(id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors ${
                    id === currentSessionId
                      ? "bg-gray-100 dark:bg-secondary-700"
                      : ""
                  }`}
                >
                  {getUserNameFromSessionId(id)}
                </button>
              </li>
            ))}
            <li className="border-t dark:border-secondary-700">
              <button
                onClick={() => {
                  onAddNewSession();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-primary-500 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
              >
                + Añadir nueva sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
