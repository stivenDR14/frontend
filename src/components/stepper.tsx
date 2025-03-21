import { ChatSteps } from "@/app/models";
import { ScheduleAppointmentStepper } from "./stepps/schedule_appointment.stepper";
import { CheckAppointmentAvailabilityStepper } from "./stepps/check-appointment-availability.stepper";
import { WeatherStepper } from "./stepps/weather.stepper";
import { DealershipAddressStepper } from "./stepps/dealership-address.stepper";
import { useState, useRef, useEffect } from "react";
import RequestPrompt from "@/app/constants/prompts";

export const STEP_COMPONENTS = {
  get_weather: WeatherStepper,
  get_dealership_address: DealershipAddressStepper,
  check_appointment_availability: CheckAppointmentAvailabilityStepper,
  schedule_appointment: ScheduleAppointmentStepper,
};

export default function Stepper({
  showGreeting,
  userName,
  steps,
  submitInput,
}: {
  showGreeting: boolean;
  userName: string;
  steps: ChatSteps;
  submitInput: (input: string) => void;
}) {
  const [stepHeights, setStepHeights] = useState<Record<string, number>>({});

  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const heights: Record<string, number> = {};

    Object.keys(steps).forEach((stepName) => {
      if (stepRefs.current[stepName]) {
        heights[stepName] = stepRefs.current[stepName]?.clientHeight || 0;
      }
    });

    setStepHeights(heights);
  }, [steps]);

  return (
    <div className="stepper relative">
      {showGreeting && (
        <div className="mx-auto w-full p-3 bg-primary-dark dark:bg-primary-light text-background-light dark:text-background-dark rounded animate-fade-in my-4">
          ¡Welcome again, {userName}!
        </div>
      )}
      <div className="mx-auto w-full p-3 bg-primary-dark dark:bg-primary-light text-background-light dark:text-background-dark rounded mb-8">
        It&apos;s time for you <b>schedule</b> your appointment!
        <br />
        Let&apos;s get started! There are some steps you need to follow for
        scheduling your <b>test drive</b>:
      </div>
      {/* Desktop version */}
      <div className="mt-4">
        {Object.entries(steps).map(([stepName, item], index) => {
          return (
            <div
              key={stepName}
              className={item.done ? "relative" : "mb-8 relative"}
            >
              <div className="flex">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary-dark dark:bg-foreground-dark border-2 border-foreground-light dark:border-foreground-dark flex items-center justify-center">
                    {item.done && (
                      <span className="absolute top-4 right-4 bg-primary-light dark:bg-primary-dark text-foreground-light dark:text-foreground-dark text-xs rounded-full w-8 h-8 flex items-center justify-center">
                        ✓
                      </span>
                    )}

                    {/* Connector line (except for the last element) */}
                    {index < Object.keys(steps).length - 1 && (
                      <div
                        className="absolute left-1/2 w-0.5 bg-foreground-light dark:bg-foreground-dark -ml-px"
                        style={{
                          top: "64px", // Altura del círculo
                          height: `${Math.max(
                            stepHeights[stepName] - 64,
                            32
                          )}px`, // Altura dinámica basada en el contenido
                        }}
                      ></div>
                    )}
                  </div>
                </div>

                <div
                  className="ml-4"
                  ref={(el) => {
                    stepRefs.current[stepName] = el;
                  }}
                >
                  {item.done ? (
                    <div className="p-2 rounded-md">
                      {STEP_COMPONENTS[
                        stepName as keyof typeof STEP_COMPONENTS
                      ](true, item.output, (data) => {
                        console.log("clicked", data, stepName);
                        if (stepName === "check_appointment_availability") {
                          submitInput(
                            `For tomorrow at ${data} would be nice to have a reservation`
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        submitInput(
                          RequestPrompt[stepName as keyof typeof RequestPrompt]
                        );
                      }}
                      className="bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light dark:hover:bg-primary-dark px-2 py-1 rounded-md shadow-lg mt-4"
                    >
                      <p className="text-sm text-foreground-dark dark:text-foreground-dark">
                        {stepName
                          .split("_")
                          .join(" ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
