import React from "react";
import { NavLink } from "../navLink";
import { useRouter } from "next/router";

function SidebarItem({ icon, path, text }) {
  const router = useRouter();
  const page = router.pathname;

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "" && "bg-gray-900"
      }`}
    >
      <NavLink
        href={path}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <div className="text-sm font-medium text-purple-200 mr-2 w-5">
            {icon}
          </div>
          <span className="text-sm font-medium text-white">{text}</span>
        </div>
      </NavLink>
    </li>
  );
}

export default SidebarItem;
