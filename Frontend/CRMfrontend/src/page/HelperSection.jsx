import React from "react";
import team from "../assets/bg.jpg";

const HelpSection = () => {
  return (
    <section
      className="relative flex h-[400px] items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${team})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 ml-10 md:ml-20">
        <h1 className="!text-5xl !font-bold !text-olive-50 md:text-5xl">
          We are here
        </h1>

        <h2 className="!ml-30 !text-4xl font-bold !text-olive-50 md:ml-16 md:text-5xl">
          to help you..
        </h2>
      </div>
    </section>
  );
};

export default HelpSection;
