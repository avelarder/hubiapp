import React from "react";
import Notification from "./notification";
import UserInfo from "./user-info";
import Image from "next/image";

function Header({ appName, user }) {
  return (
    <div className="flex bg-purple-700 items-center">
      <div className="flex ml-4">
        <Image
          src="/hubi-white-logo.png"
          width="50px"
          height="50px"
          alt="Hubi Logo"
        ></Image>
      </div>
      <div className="flex flex-1 text-xl text-white h-full justify-start">
        {appName}
      </div>
      <div className="flex flex-row-reverse mx-4  text-white">
        <Notification></Notification>
      </div>
      <div className="flex flex-row-reverse mr-4  text-white">
        <UserInfo user={user}></UserInfo>
      </div>
    </div>
  );
}

export default Header;
