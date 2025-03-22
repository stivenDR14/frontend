import React from "react";

export default function HeroBanner({ userName }: { userName: string }) {
  return (
    <div
      className="hero-banner relative bg-cover bg-center h-64 md:h-96"
      style={{ backgroundImage: "url(/luxury-car.png)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold">Hey {userName}!</h1>
        <p className="mt-2 text-lg md:text-xl">
          Get ready for your test drive experience!
        </p>
      </div>
    </div>
  );
}
