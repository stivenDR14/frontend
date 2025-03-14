/* 
 {"output": "\"```['10:00', '11:30', '13:00', '16:30', '17:45']```\"", "name": "check_appointment_availability"}
 */

export const CheckAppointmentAvailabilityStepper = (
  output: string,
  callbackButton: (selectedTime: string) => void
) => {
  const parsedOutput = JSON.parse(output);
  const timesParsed = JSON.parse(parsedOutput.output.replaceAll("```", ""));

  const array = timesParsed
    .slice(1, -1) // Elimina los corchetes
    .split(",") // Divide por comas
    .map((s: string) => s.trim().replace(/'/g, ""));

  const handleButtonClick = (selectedTime: string) => {
    callbackButton(selectedTime);
  };

  return (
    <div>
      {timesParsed &&
        timesParsed.length > 0 &&
        array.map((item: string) => (
          <button
            key={item}
            className="bg-blue-500 text-white mx-2 px-2 py-2 rounded-md"
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
