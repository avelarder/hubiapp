import React, { useState } from "react";
import NavLink from "../navLink";
import { useRouter } from "next/router";
import Tooltip from "react-simple-tooltip";

function SidebarItem({
  icon,
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
      className={`flex  px-3 py-2 rounded-sm mb-0.5  last:mb-0 ${
        page === "" && "bg-gray-900"
      }`}
      onClick={handleNestedContainerCollapsed}
    >
      <NavLink
        href={path}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "" && "hover:text-gray-200"
        }`}
      >
        <div className=" m-2  flex justify-center">
          {icon && (
            <Tooltip
              content={text}
              placement="right"
              background="rgb(124, 58, 237)"
              padding={10}
              border="rgba(255, 255, 255, 0)"
            >
              <div
                className={`flex justify-center rounded-lg text-sm h-12 w-12`}
              >
                {icon}
              </div>
            </Tooltip>
          )}
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
