"use client";

import { useState } from "react";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isFirstTime: boolean;
}

export default function SessionModal({
  isOpen,
  onClose,
  onSubmit,
  isFirstTime,
}: SessionModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isFirstTime ? "¡Bienvenido!" : "Nueva sesión"}
        </h2>
        <p className="mb-4">
          {isFirstTime
            ? "Por favor, introduce tu nombre para comenzar:"
            : "Introduce un nombre para esta nueva sesión:"}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full p-2 border rounded mb-4 dark:bg-secondary-700 dark:border-secondary-600"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            {!isFirstTime && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 dark:bg-secondary-700 text-white rounded hover:bg-primary-600 dark:hover:bg-secondary-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
