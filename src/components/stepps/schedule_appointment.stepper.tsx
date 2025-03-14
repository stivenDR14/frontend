/* 
{"output": "\"```{'confirmacion_id': 'SuperCar-123', 'fecha': 'today', 'hora': '11:30', 'modelo': 'SuperCar 123', 'mensaje': 'Cita agendada exitosamente'}```\"", "name": "schedule_appointment"}
*/

export const ScheduleAppointmentStepper = (output: string) => {
  const parsedOutput = JSON.parse(output);
  let receiptStr = parsedOutput.output;

  receiptStr = receiptStr
    .slice(1, -1)
    .replace(/```/g, "")
    .trim()
    .replace(/'/g, '"');

  const receiptParsed = JSON.parse(receiptStr);

  return (
    <div className="bg-gray-600 p-4 rounded-md shadow-md mx-4 flex-column items-center md:w-1/2 xs:w-full">
      <h3 className="text-lg font-bold">Appointment Receipt</h3>
      <ul className="list-disc ml-4">
        <li>
          <p className="text-sm">{receiptParsed.confirmacion_id}</p>
        </li>
        <li>
          <p className="text-sm">{receiptParsed.fecha}</p>
        </li>
        <li>
          <p className="text-sm">{receiptParsed.hora}</p>
        </li>
        <li>
          <p className="text-sm">{receiptParsed.modelo}</p>
        </li>
        <li>
          <p className="text-sm">{receiptParsed.mensaje}</p>
        </li>
      </ul>
    </div>
  );
};
