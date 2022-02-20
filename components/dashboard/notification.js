import React from "react";
import Search from "./search";
import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";

function Notification() {
  return (
    <div className="flex justify-start">
      <Search></Search>
      <BellIcon className="text-purple-500 h-5 w-5 m-2"></BellIcon>
      <QuestionMarkCircleIcon className="text-purple-500 h-5 w-5 m-2"></QuestionMarkCircleIcon>
    </div>
  );
}

export default Notification;
