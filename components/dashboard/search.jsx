import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function Search() {
  return (
    <div className="flex">
      <div className="relative flex">
        <input className="h-10 0lg:max-w-full rounded-full border-1 border-purple-300"></input>
        <span className="absolute inset-y-0 right-0 flex items-center">
          <SearchIcon className="relative text-purple-500 h-5 w-5 m-2"></SearchIcon>
        </span>
      </div>
    </div>
  );
}

export default Search;
