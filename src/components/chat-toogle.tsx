"use client";

import { BotAvatar } from "@/app/constants/svg";
import { Dispatch, SetStateAction } from "react";

export default function ChatToggle({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-background-dark dark:bg-background-light text-foreground-dark dark:text-foreground-light shadow-lg hover:bg-secondary-dark dark:hover:bg-secondary-light transition-all duration-300"
    >
      <BotAvatar />
    </button>
  );
}
