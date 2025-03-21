"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/modals/dialog";
import UserNameForm from "@/components/user-name-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WeatherSun, Location, Calendar, Check } from "@/app/constants/svg";

export default function OnboardingModal({
  isUserFormOpen,
  showModal,
  isFirstTimeUser,
  setIsUserFormOpen,
  setShowModal,
  handleNameSubmit,
}: {
  isUserFormOpen: boolean;
  showModal: boolean;
  isFirstTimeUser: boolean;
  setIsUserFormOpen: Dispatch<SetStateAction<boolean>>;
  setShowModal: (open: boolean) => void;
  handleNameSubmit: (name: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setStep(0);
    setUserName("");
  }, [isFirstTimeUser, isUserFormOpen, showModal]);

  const handleNameFormSubmit = (name: string) => {
    setUserName(name);
    if (isFirstTimeUser) {
      setStep(1); // Move to first onboarding step
    } else {
      handleNameSubmit(name);
      setIsUserFormOpen(false);
    }
  };

  const handleFinishOnboarding = () => {
    if (userName === "") {
      setStep(0);
    } else {
      handleNameSubmit(userName);
      setIsUserFormOpen(false);
      setShowModal(false);
    }
  };

  const stepJustName = [
    {
      title: "Access with your user name",
      description:
        "Enter your user name to access the scheduling of your test drive.",
      content: (
        <UserNameForm
          onSubmit={handleNameFormSubmit}
          isFirstTime={isFirstTimeUser}
          onCancel={() => {
            setIsUserFormOpen(false);
          }}
        />
      ),
    },
  ];

  const steps = [
    {
      title: "Welcome to SuperCar Scheduler",
      description:
        "Enter your name to get started with scheduling your test drive.",
      content: (
        <UserNameForm
          onSubmit={handleNameFormSubmit}
          isFirstTime={isFirstTimeUser}
          onCancel={() => {}}
        />
      ),
    },
    {
      title: "Check the Weather",
      description:
        "Our assistant can check the weather for your test drive location to ensure optimal driving conditions.",
      content: (
        <div className="flex flex-col items-center p-4 space-y-4">
          <WeatherSun />
          <p className="text-center text-foreground-light dark:text-foreground-dark">
            Get real-time weather updates for any location to plan your test
            drive accordingly.
          </p>
        </div>
      ),
    },
    {
      title: "Find Dealership Locations",
      description:
        "Discover the nearest dealership locations where you can schedule your test drive.",
      content: (
        <div className="flex flex-col items-center p-4 space-y-4">
          <Location />
          <p className="text-center text-foreground-light dark:text-foreground-dark">
            Our assistant can help you find the closest dealership with your
            preferred car model.
          </p>
        </div>
      ),
    },
    {
      title: "Check Appointment Availability",
      description:
        "See available time slots for your test drive at your chosen dealership.",
      content: (
        <div className="flex flex-col items-center p-4 space-y-4 text-foreground-light dark:text-foreground-dark">
          <Calendar />
          <p className="text-center text-foreground-light dark:text-foreground-dark">
            Our intelligent assistant will check real-time availability and
            suggest the best times for your test drive.
          </p>
        </div>
      ),
    },
    {
      title: "Schedule Your Appointment",
      description:
        "Finalize your test drive appointment with our intelligent assistant.",
      content: (
        <div className="flex flex-col items-center p-4 space-y-4">
          <Check />
          <p className="text-center text-foreground-light dark:text-foreground-dark">
            Confirm your appointment details and receive a confirmation with all
            the information you need.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Dialog
      open={isUserFormOpen || showModal}
      onOpenChange={(open) => {
        if (!open && !isFirstTimeUser) {
          setIsUserFormOpen(false);
          setShowModal(false);
        }
      }}
    >
      <DialogContent className="bg-primary-light dark:bg-primary-dark border-foreground-light dark:border-foreground-dark max-w-md">
        {/* Progress indicator */}
        {isFirstTimeUser && (
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  index <= step
                    ? "bg-foreground-light dark:bg-foreground-dark"
                    : "bg-foreground-light/30 dark:bg-foreground-dark/30"
                }`}
              />
            ))}
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-foreground-light dark:text-foreground-dark text-xl">
            {steps[step].title}
          </DialogTitle>
          <DialogDescription className="text-foreground-light/80 dark:text-foreground-dark/80">
            {steps[step].description}
          </DialogDescription>
        </DialogHeader>

        {isFirstTimeUser && <div className="py-4">{steps[step].content}</div>}
        {isFirstTimeUser && step === 0 && (
          <div
            className={
              userName !== ""
                ? "text-foreground-light dark:text-foreground-dark"
                : "text-secondary-light dark:text-secondary-dark bg-foreground-light dark:bg-foreground-dark rounded-md p-2 animate-fade-in"
            }
          >
            {userName !== ""
              ? `The name you have entered is: ${userName}`
              : "You have not entered a name yet"}
          </div>
        )}

        {isFirstTimeUser ? (
          <div className="flex justify-between mt-4">
            {step > 0 ? (
              <button
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-md bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark border border-foreground-light/20 dark:border-foreground-dark/20 hover:bg-background-light/80 dark:hover:bg-background-dark/80 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={() =>
                  setStep((prev) => Math.min(steps.length - 1, prev + 1))
                }
                className="px-4 py-2 rounded-md bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark hover:bg-foreground-light/80 dark:hover:bg-foreground-dark/80 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinishOnboarding}
                className="px-4 py-2 rounded-md bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark hover:bg-foreground-light/80 dark:hover:bg-foreground-dark/80 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>
        ) : (
          stepJustName[0].content
        )}
      </DialogContent>
    </Dialog>
  );
}
