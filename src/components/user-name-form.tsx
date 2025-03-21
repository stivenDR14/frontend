"use client";

import { useState } from "react";
import { DialogClose } from "@/components/modals/dialog";

interface UserNameFormProps {
  onSubmit: (name: string) => void;
  isFirstTime: boolean;
  onCancel: () => void;
}

export default function UserNameForm({
  onSubmit,
  isFirstTime,
  onCancel,
}: UserNameFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 border rounded bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark border-foreground-light/20 dark:border-foreground-dark/20 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-2">
        {!isFirstTime && (
          <DialogClose asChild>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark border border-foreground-light/20 dark:border-foreground-dark/20 hover:bg-background-light/80 dark:hover:bg-background-dark/80 transition-colors"
            >
              Cancel
            </button>
          </DialogClose>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark hover:bg-foreground-light/80 dark:hover:bg-foreground-dark/80 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
