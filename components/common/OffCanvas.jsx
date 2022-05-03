import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import FieldContainer from "./field-container";

const OffCanvas = ({ showSidebar, setShowSidebar, children }) => {
  return (
    <>
      {showSidebar && (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <XIcon className="h-8 w-8 bg-purple-800"></XIcon>
        </button>
      )}

      {showSidebar && (
        <div
          className={`top-0 right-0 w-[35vw] bg-purple-100 bg-opacity-50  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
            showSidebar ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default OffCanvas;
