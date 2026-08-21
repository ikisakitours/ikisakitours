import React from "react";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="premium-serif mb-6 text-[25px] italic text-white md:mb-8 md:text-[28px]">{children}</h2>;
}

export default SectionHeading;
