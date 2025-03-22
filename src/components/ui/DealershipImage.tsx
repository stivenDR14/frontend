import React from "react";
import Image from "next/image";
export default function DealershipImage() {
  return (
    <div className="dealership-image w-full md:w-1/2 p-4">
      <Image
        width={1000}
        height={1000}
        src="/dealership.png"
        alt="Dealership"
        className="rounded shadow-lg"
      />
    </div>
  );
}
