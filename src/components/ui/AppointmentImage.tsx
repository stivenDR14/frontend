import React from "react";

export default function AppointmentImage() {
  return (
    <div
      className="appointment-image relative bg-cover bg-center h-32 md:h-48"
      style={{ backgroundImage: "url(/dashboard.png)" }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
}
