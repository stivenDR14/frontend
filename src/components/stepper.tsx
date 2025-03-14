import { ChatSteps } from "@/app/models";
import { ScheduleAppointmentStepper } from "./stepps/schedule_appointment.stepper";
import { CheckAppointmentAvailabilityStepper } from "./stepps/check-appointment-availability.stepper";
import { WeatherStepper } from "./stepps/weather.stepper";
import { DealershipAddressStepper } from "./stepps/dealership-address.stepper";
import { useState } from "react";

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
}: {
  showGreeting: boolean;
  userName: string;
  steps: ChatSteps;
}) {
  const [showModal, setShowModal] = useState(false);
  const [contentNameClicked, setContentNameClicked] = useState("");
  const [contentOutput, setContentOutput] = useState("");

  const modalContent = () => {
    return STEP_COMPONENTS[contentNameClicked as keyof typeof STEP_COMPONENTS](
      contentOutput,
      () => {}
    );
  };
  return (
    <div className="stepper relative">
      {showGreeting && (
        <div className="mx-auto w-full p-3 bg-green-100 text-green-600 rounded animate-fade-in mb-4">
          ¡Welcome again, {userName}!
        </div>
      )}

      {/* Mobile version */}
      <div className="flex md:hidden justify-center gap-4">
        {Object.entries(steps).map(([stepName, item]) => (
          <div
            key={stepName}
            className="step relative flex flex-col items-center"
          >
            {item.done ? (
              <button
                className="bg-blue-500 text-white mx-2 px-2 py-2 rounded-md"
                onClick={() => {
                  //show a modal with the stepComponent
                  setShowModal(true);
                  setContentNameClicked(stepName);
                  setContentOutput(item.output);
                }}
              >
                <span className="text-sm text-white">✓</span>
              </button>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
            )}
            <p className="text-xs text-center mt-1">
              {stepName
                .split("_")
                .join(" ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop version */}
      <div className="hidden md:block mt-4">
        {Object.entries(steps).map(([stepName, item], index) => {
          return (
            <div key={stepName} className="relative">
              <div className="flex items-start mb-8">
                <div className="relative">
                  {/* call the StepCpmponent, but scale it to 64px */}
                  {
                    <button
                      className="bg-blue-500 text-white mx-2 px-2 py-2 rounded-md"
                      onClick={() => {
                        //show a modal with the stepComponent
                        setShowModal(true);
                        setContentNameClicked(stepName);
                        setContentOutput(item.output);
                      }}
                    ></button>
                  }
                  {item.done && (
                    <span className="absolute top-3 right-0 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      ✓
                    </span>
                  )}

                  {/* Connector line (except for the last element) */}
                  {index < Object.keys(steps).length - 1 && (
                    <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-gray-300 -ml-px"></div>
                  )}
                </div>

                <div className="ml-4">
                  <h3 className="font-medium">
                    {item.done ? "Completed" : "Pending"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {stepName
                      .split("_")
                      .join(" ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md">
            <button
              className="absolute top-8 right-8 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <span className="text-6xl text-white">&times;</span>
            </button>
            {modalContent()}
          </div>
        </div>
      )}
    </div>
  );
}
