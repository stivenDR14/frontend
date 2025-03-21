"use client";

import { Create, Eraser } from "@/app/constants/svg";

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
  // Extract the user name from the session id
  const getUserNameFromSessionId = (id: string) => {
    return id.split("-")[0];
  };

  const onClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-foreground-light dark:text-foreground-dark">
          Current users
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {sessionIds.map((id) => (
            <button
              key={id}
              onClick={() => onSelectSession(id)}
              className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
                id === currentSessionId
                  ? "bg-secondary-light dark:bg-secondary-dark text-foreground-dark dark:text-foreground-dark"
                  : "bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark hover:bg-secondary-light/50 dark:hover:bg-secondary-dark/50"
              }`}
            >
              <span>{getUserNameFromSessionId(id)}</span>
              {id === currentSessionId && (
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-foreground-light/20 dark:border-foreground-dark/20">
        <button
          onClick={onAddNewSession}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark rounded-md hover:bg-foreground-light/80 dark:hover:bg-foreground-dark/80 transition-colors"
        >
          <Create />
          Create new user
        </button>
        <button
          onClick={onClearStorage}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark rounded-md hover:bg-foreground-light/80 dark:hover:bg-foreground-dark/80 transition-colors"
        >
          <Eraser />
          Clear all users
        </button>
      </div>
    </div>
  );
}
