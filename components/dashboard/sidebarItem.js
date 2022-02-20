import React, { useState } from "react";
import { NavLink } from "../navLink";
import { useRouter } from "next/router";

function SidebarItem({
  icon,
  backgroundColor,
  path,
  text,
  nestedItems,
  nestedItemCollapsed,
  setItemCollapsed,
}) {
  const router = useRouter();
  const page = router.pathname;

  const handleNestedContainerCollapsed = () => {
    setItemCollapsed && nestedItems && setItemCollapsed();
  };

  return (
    <li
      className={`flex flex-col items-center align-middle text-center item px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "" && "bg-gray-900"
        }`}
      onClick={handleNestedContainerCollapsed}
    >
      <NavLink
        href={path}
        className={`block text-gray-200 hover:text-white transition duration-150 ${page === "" && "hover:text-gray-200"
          }`}
      >
        <div className="flex flex-col text-center">
          {icon && (
            <div className={`flex justify-center items-center self-center rounded-lg text-sm text-purple-200 h-14 w-14 ${backgroundColor ?? "bg-transparent"}`}>
              <div className="w-8 h-8" >
                {icon}
              </div>
            </div>
          )}
          <span className="text-xs text-center text-gray-800">{text}</span>
        </div>
      </NavLink>

      {nestedItems && nestedItemCollapsed && (
        <div className="bg-purple-800 rounded-lg border-1 border-purple-500 mt-4 ">
          <ul>
            {nestedItems.map((nestedItem) => (
              <SidebarItem
                key={nestedItem.key}
                path={nestedItem.path}
                text={nestedItem.text}
              ></SidebarItem>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default SidebarItem;
