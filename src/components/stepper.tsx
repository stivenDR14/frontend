import { isMobile } from "@/helpers/responsive.helper";
import { useState, useEffect } from "react";

export default function Stepper() {
  const steps = [
    { id: 1, label: "Step 1", done: true },
    { id: 2, label: "Step 2", done: true },
    { id: 3, label: "Step 3", done: false },
  ];

  const [mobileView, setMobileView] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setMobileView(isMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`stepper ${mobileView ? "mobile" : "desktop"}`}>
      {steps.map((step) => (
        <div key={step.id} className="step">
          {mobileView ? (
            <span className="emoji">{step.done ? "✅" : "⭕"}</span>
          ) : (
            <div className="image-container">
              {/* <img src={`/images/step-${step.id}.svg`} alt={step.label} /> */}
              {/* the file next.svg is in the public folder */}
              <img src={`/next.svg`} alt={step.label} />
              {step.done && <span className="badge">✅</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
