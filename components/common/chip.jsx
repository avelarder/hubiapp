import { XCircleIcon } from "@heroicons/react/solid";
import React from "react";

function Chip({ text, index, onRemoveChip }) {
  return (
    <div className="flex flex-wrap justify-center space-x-2 p-1">
      <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        {text}
        <button
          className="bg-transparent hover focus:outline-none"
          onClick={() => onRemoveChip(index)}
        >
          <XCircleIcon className="ml-2 w-5 h-5"></XCircleIcon>
        </button>
      </span>
    </div>
  );
}

export default Chip;
