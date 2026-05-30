import React from "react";
import team from "../assets/team.jpg";

const HelpSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-96 flex items-center justify-center"
      style={{
        backgroundImage: `url(${team})`, // <-- yahan backticks ke andar variable
      }}
    >
      {/* Overlay for dark effect (optional) */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text Content */}
      <h1 className="relative text-white text-3xl text-center z-10">
        We are here to help you
      </h1>
    </section>
  );
};

export default HelpSection;
