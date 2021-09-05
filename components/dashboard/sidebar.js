import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeftIcon,
  OfficeBuildingIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./sidebarItem";
import { text } from "dom-helpers";

function Sidebar({ open, setOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !open ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!open || keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const router = useRouter();
  const page = router.pathname;

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-purple-800 p-2 transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex mb-10 sm:px-2">
          {/* Close button */}
          <div className="flex items-start pl-3 mt-4">
            <button
              ref={trigger}
              className="lg:hidden text-purple-200 hover:text-gray-400"
              onClick={() => {
                setOpen(!open);
              }}
              aria-controls="sidebar"
              aria-expanded={open}
            >
              {/* <span className="sr-only">Close sidebar</span> */}
              <ArrowLeftIcon className="text-purple-200 w-4 mr-2"></ArrowLeftIcon>
            </button>
          </div>
          {/* Logo */}
          <div className="flex flex-col items-end">
            <div className="flex">
              <Link passHref href="/dashboard">
                <Image
                  src="/hubi-white-logo.png"
                  width="50px"
                  height="50px"
                  alt="Hubi Logo"
                ></Image>
              </Link>
            </div>
            <div className="flex text-sm text-white h-full font-bold">
              tu comunidad en línea.
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase text-purple-100 font-semibold pl-3">
            ACCESOS
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <SidebarItem
              icon={<TemplateIcon></TemplateIcon>}
              path="/dashboard"
              text="Panel de Control"
            ></SidebarItem>
            {/* Customers */}
            <SidebarItem
              icon={<OfficeBuildingIcon></OfficeBuildingIcon>}
              path="/buildings"
              text="Edificios"
            ></SidebarItem>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
