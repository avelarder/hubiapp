import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function Search() {
  return (
    <div className="flex">
      <div className="relative flex">
        <input className="bg-gradient-to-r from-gray-50 to-white h-10 0lg:max-w-full rounded-full border-b-1 border-gray-200"></input>
        <span className="absolute inset-y-0 right-0 flex items-center">
          <SearchIcon className="relative text-gray-400 h-5 w-5 m-2"></SearchIcon>
        </span>
      </div>
    </div>
  );
}

export default Search;
