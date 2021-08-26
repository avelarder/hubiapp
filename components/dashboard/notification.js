import React from "react";
import Search from "./search";
import { ChatIcon, InformationCircleIcon } from "@heroicons/react/solid";

function Notification() {
  return (
    <div className="flex justify-start">
      <Search></Search>
      <ChatIcon className="h-5 w-5 m-2"></ChatIcon>
      <InformationCircleIcon className="h-5 w-5 m-2"></InformationCircleIcon>
    </div>
  );
}

export default Notification;
