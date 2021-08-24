import React from "react";
import Search from "./search";
import { ChatIcon, InformationCircleIcon } from "@heroicons/react/solid";

function Notification() {
  return (
    <div className="flex items-center">
      <div>
        <Search></Search>
      </div>
      <div>
        <ChatIcon className="h-5 w-5 m-2"></ChatIcon>
      </div>
      <div>
        <InformationCircleIcon className="h-5 w-5 m-2"></InformationCircleIcon>{" "}
      </div>
    </div>
  );
}

export default Notification;
