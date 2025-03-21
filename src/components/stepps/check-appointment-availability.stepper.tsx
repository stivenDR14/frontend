/* 
 {"output": "\"```['10:00', '11:30', '13:00', '16:30', '17:45']```\"", "name": "check_appointment_availability"}
 */

export const CheckAppointmentAvailabilityStepper = (
  isStepper: boolean,
  output: string,
  callbackButton: (selectedTime: string) => void
) => {
  const parsedOutput = JSON.parse(output);
  const timesParsed = JSON.parse(parsedOutput.output.replaceAll("```", ""));

  const array = timesParsed
    .slice(1, -1)
    .split(",")
    .map((s: string) => s.trim().replace(/'/g, ""));

  const handleButtonClick = (selectedTime: string) => {
    callbackButton(selectedTime);
  };

  return (
    <div
      className={`bg-background-light dark:bg-primary-light rounded-md shadow-lg flex flex-col items-center p-2 ${
        isStepper ? "md:w-2/3 xs:w-full mx-4" : "w-full mb-2"
      }`}
    >
      <h4 className="text-md text-foreground-light dark:text-background-dark mb-2">
        Next are the available times for your appointment tomorrow:
      </h4>
      {/* organize the different times in a grid of 2 columns per row */}
      <div className="grid grid-cols-2 gap-1">
        {timesParsed &&
          timesParsed.length > 0 &&
          array.map((item: string) => (
            <button
              key={item}
              className="bg-secondary-light dark:bg-secondary-dark text-foreground-dark dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary-dark mx-2 px-2 py-2 rounded-md mb-2"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
      </div>
    </div>
  );
};
