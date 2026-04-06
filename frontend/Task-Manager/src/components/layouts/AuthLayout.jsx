import React from "react";
import UI_IMG from "../../assets/bg-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">

      {/* LEFT SIDE */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 bg-white">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div
        className="hidden md:flex w-[40vw] h-screen bg-cover bg-center bg-no-repeat items-center justify-center"
        style={{ backgroundImage: `url(${UI_IMG})` }}
      >
      </div>

    </div>
  );
};

export default AuthLayout;
