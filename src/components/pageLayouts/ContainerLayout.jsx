import React from "react";

export default function ContainerLayout({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-480 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-40 3xl:px-[8%] ${className}`}
    >
      {children}
    </div>
  );
}
