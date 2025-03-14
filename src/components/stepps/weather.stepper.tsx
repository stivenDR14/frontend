/* 
{"output": "The weather in New York is 34\u00b0C", "name": "get_weather"}
*/

import Image from "next/image";

export const WeatherStepper = (output: string) => {
  const parsedOutput = JSON.parse(output);
  return (
    <div className="bg-gray-600 p-4 rounded-md shadow-md mx-4 flex-column items-center w-1/2">
      <h3 className="text-lg font-bold">Weather</h3>
      <Image src="/sun.svg" alt="Weather" width={100} height={100} />
      <p className="text-sm">{parsedOutput.output}</p>
    </div>
  );
};
