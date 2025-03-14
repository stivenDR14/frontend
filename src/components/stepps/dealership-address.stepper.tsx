/* 
{"output": "5th Avenue, New York", "name": "get_dealership_address"}
*/

import Image from "next/image";

export const DealershipAddressStepper = (output: string) => {
  const parsedOutput = JSON.parse(output);
  return (
    <div className="flex justify-between items-center bg-gray-600 p-4 md:w-1/2 xs:w-full mx-4">
      <div className="flex justify-center items-center w-2/5">
        <Image src="/location.svg" alt="Location" width={100} height={100} />
      </div>
      <div className="rounded-md shadow-md flex-1 mr-4">
        <h3 className="text-lg font-bold">City</h3>
        <p className="text-sm">{parsedOutput.output.split(",")[0]}</p>
        <h3 className="text-lg font-bold">Address</h3>
        <p className="text-sm">{parsedOutput.output.split(",")[1]}</p>
      </div>
    </div>
  );
};
