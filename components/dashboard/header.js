import React from "react";
import Notification from "./notification";
import UserInfo from "./user-info";

// function Header({ appName, user }) {
//   return (
//     <div className="flex bg-purple-700 items-center">
//       <div className="flex ml-4">
//         <Image
//           src="/hubi-white-logo.png"
//           width="50px"
//           height="50px"
//           alt="Hubi Logo"
//         ></Image>
//       </div>
//       <div className="flex flex-1 text-xl text-white h-full justify-start">
//         {appName}
//       </div>
//       <div className="flex flex-row-reverse mx-4  text-white">
//         <Notification></Notification>
//       </div>
//       <div className="flex flex-row-reverse mr-4  text-white">
//         <UserInfo user={user}></UserInfo>
//       </div>
//     </div>
//   );
// }

function Header({ user, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}

          <div className="flex flex-row">
            <Notification />
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserInfo user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
