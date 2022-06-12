import React, { useState } from "react";

function RoundedLabel({ label, value }) {
  return (
    <div>
      <span className="text-gray-400 text-xs ml-6">{label}</span>
      <div
        className={
          "flex items-center text-sm text-black w-full h-10 border-gray-100  rounded-full border-1 pl-6"
        }
      >
        {value}
      </div>
    </div>
  );
}

export default RoundedLabel;
