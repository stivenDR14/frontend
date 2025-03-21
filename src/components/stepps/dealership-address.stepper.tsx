/* 
{"output": "5th Avenue, New York", "name": "get_dealership_address"}
*/

import { Location } from "@/app/constants/svg";

export const DealershipAddressStepper = (
  isStepper: boolean,
  output: string
) => {
  const parsedOutput = JSON.parse(output);

  // Separar la dirección en ciudad y calle
  const addressParts = parsedOutput.output.split(",");
  const street = addressParts[0]?.trim() || "";
  const city = addressParts[1]?.trim() || "";

  return (
    <div
      className={`rounded-md shadow-lg bg-background-light dark:bg-primary-light p-4 max-h-64 overflow-y-auto ${
        isStepper ? "md:w-3/4 xs:w-full mx-4" : "w-full mb-2"
      } flex flex-col md:flex-row items-center`}
    >
      <div className="flex-column md:w-2/4 xs:w-2/4 text-foreground-light dark:text-background-dark">
        <h3 className="text-xl font-bold mb-2">Dealership Location</h3>
        <div className="flex justify-center items-center w-full md:w-3/5 mb-4 md:mb-0">
          <Location />
        </div>
      </div>
      {/* divisor line */}
      <div className="w-4 h-full bg-foreground-light dark:bg-foreground-dark"></div>

      <div className=" text-foreground-light dark:text-background-dark">
        <div className="space-y-2">
          <div>
            <h4 className="text-md font-semibold">Street</h4>
            <p className="text-md">{street}</p>
          </div>
          <div>
            <h4 className="text-md font-semibold">City</h4>
            <p className="text-md">{city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
