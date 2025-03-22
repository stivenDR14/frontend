import React from "react";
import Image from "next/image";
export default function CTAImage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-16 h-16 rounded-full bg-primary-dark dark:bg-foreground-dark border-2 border-foreground-light dark:border-foreground-dark flex items-center justify-center">
      <Image
        width={1000}
        height={1000}
        src="/luxury-card-exterior.png"
        alt="Driver"
        className="w-16 h-16 rounded-full shadow-lg"
      />
      {children}
    </div>
  );
}
