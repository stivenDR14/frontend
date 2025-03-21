/* 
{"output": "\"```{'confirmacion_id': 'SuperCar-123', 'fecha': 'today', 'hora': '11:30', 'modelo': 'SuperCar 123', 'mensaje': 'Cita agendada exitosamente'}```\"", "name": "schedule_appointment"}
*/

export const ScheduleAppointmentStepper = (
  isStepper: boolean,
  output: string
) => {
  const parsedOutput = JSON.parse(output);
  let receiptStr = parsedOutput.output;

  receiptStr = receiptStr
    .slice(1, -1)
    .replace(/```/g, "")
    .trim()
    .replace(/'/g, '"');

  const receiptParsed = JSON.parse(receiptStr);

  return (
    <div
      className={`bg-background-light dark:bg-primary-light p-4 rounded-md shadow-md mx-4 flex-column items-center md:w-3/4 xs:w-full ${
        isStepper ? "md:w-4/5 xs:w-full" : "w-full mb-2"
      }`}
    >
      <div className="flex flex-row items-center">
        <div className="text-2xl mr-2">🎉</div>
        <h3 className="text-lg font-bold">Appointment Receipt</h3>
      </div>
      <ul className="list-disc ml-4">
        <li>
          <b className="text-sm">Confirmation ID:</b>
          <p className="text-sm">{receiptParsed.confirmacion_id}</p>
        </li>
        <li>
          <b className="text-sm">Date:</b>
          <p className="text-sm">{receiptParsed.fecha}</p>
        </li>
        <li>
          <b className="text-sm">Time:</b>
          <p className="text-sm">{receiptParsed.hora}</p>
        </li>
        <li>
          <b className="text-sm">Model:</b>
          <p className="text-sm">{receiptParsed.modelo}</p>
        </li>
        <li>
          <b className="text-sm">Additional Information:</b>
          <p className="text-sm">{receiptParsed.mensaje}</p>
        </li>
      </ul>
    </div>
  );
};
