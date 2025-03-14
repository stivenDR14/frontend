export default function Stepper({
  showGreeting,
  userName,
}: {
  showGreeting: boolean;
  userName: string;
}) {
  const steps = [
    { id: 1, label: "Step 1", done: true },
    { id: 2, label: "Step 2", done: true },
    { id: 3, label: "Step 3", done: false },
  ];

  return (
    <div className="stepper relative">
      {showGreeting && (
        <div className="mx-auto w-full p-3 bg-green-100 text-green-600 rounded animate-fade-in mb-4">
          ¡Welcome again, {userName}!
        </div>
      )}

      {/* Mobile version */}
      <div className="flex md:hidden justify-center gap-4 mt-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="step relative flex flex-col items-center"
          >
            {step.done ? (
              <span className="text-2xl">✅</span>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
            )}
            <p className="text-sm text-center mt-1">{step.label}</p>
          </div>
        ))}
      </div>

      {/* Desktop version */}
      <div className="hidden md:block mt-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-start mb-8">
              <div className="relative">
                <img src={`/next.svg`} alt={step.label} className="w-32 h-16" />
                {step.done && (
                  <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                  </span>
                )}

                {/* Connector line (except for the last element) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 w-0.5 h-8 bg-gray-300 -ml-px"></div>
                )}
              </div>

              <div className="ml-4">
                <h3 className="font-medium">{step.label}</h3>
                <p className="text-sm text-gray-500">
                  {step.done ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
