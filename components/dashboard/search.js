import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function Search() {
  return (
    <div className="flex items-center">
      <input className="rounded-xl border-2 border-purple-500"></input>
      <SearchIcon className="h-5 w-5 m-2"></SearchIcon>
    </div>
  );
}

export default Search;
