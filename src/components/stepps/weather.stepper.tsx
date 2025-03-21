/* 
{"output": "The weather in New York is 34\u00b0C", "name": "get_weather"}
*/

import { WeatherSun } from "@/app/constants/svg";

export const WeatherStepper = (isStepper: boolean, output: string) => {
  const parsedOutput = JSON.parse(output);
  return (
    <div
      className={`bg-background-light dark:bg-primary-light rounded-md shadow-lg flex flex-col items-center p-4 ${
        isStepper ? "md:w-1/2 xs:w-full mx-4" : "w-full mb-2"
      }`}
    >
      <h3 className="text-lg font-bold text-foreground-light dark:text-background-dark mb-2">
        Weather
      </h3>

      <div className="flex flex-col items-center justify-center">
        <WeatherSun />
        <p className="text-md font-medium mt-2 text-foreground-light dark:text-background-dark">
          {parsedOutput.output}
        </p>
      </div>
    </div>
  );
};
