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
          {isFirstTime ? "Welcome!" : "New session"}
        </h2>
        <p className="mb-4">
          {isFirstTime
            ? "Please, introduce your name to start:"
            : "Introduce a name for this new session:"}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            {!isFirstTime && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
