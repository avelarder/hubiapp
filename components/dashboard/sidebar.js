import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { NavLink } from "../navLink";
import SidebarItem from "./sidebarItem";
import {
  BellIcon,
  ClipboardCheckIcon,
  CogIcon,
  GlobeAltIcon,
  IdentificationIcon,
  LinkIcon,
  OfficeBuildingIcon,
  PresentationChartBarIcon,
  SupportIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
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
        className={`fixed inset-0 bg-purple-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-purple-900 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact href="/" className="block">
            <Image
              className="flex align-bottom"
              src="/hubi-white-logo.png"
              width="50px"
              height="50px"
              alt="logo"
            ></Image>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm uppercase text-gray-200 font-semibold pl-3">
            ACCESOS
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <SidebarItem
              icon={<TemplateIcon></TemplateIcon>}
              path="/app/dashboard"
              text="Panel de Control"
            ></SidebarItem>
            <SidebarItem
              icon={<GlobeAltIcon></GlobeAltIcon>}
              path="/app/comunidad"
              text="Comunidad"
            ></SidebarItem>
            <SidebarItem
              icon={<ClipboardCheckIcon></ClipboardCheckIcon>}
              path="/app/employees"
              text="Empleados"
            ></SidebarItem>
            <SidebarItem
              icon={<BellIcon></BellIcon>}
              path="/app/seguridad"
              text="Seguridad"
            ></SidebarItem>
            <SidebarItem
              icon={<OfficeBuildingIcon></OfficeBuildingIcon>}
              path="/app/servicios"
              text="Servicios"
            ></SidebarItem>
            <SidebarItem
              icon={<PresentationChartBarIcon></PresentationChartBarIcon>}
              path="/app/informes"
              text="Informes"
            ></SidebarItem>
            <SidebarItem
              icon={<LinkIcon></LinkIcon>}
              path="/app/integraciones"
              text="Integraciones"
            ></SidebarItem>
            <SidebarItem
              icon={<CogIcon></CogIcon>}
              path="/app/configuracion"
              text="Configuración"
            ></SidebarItem>
            <SidebarItem
              icon={<SupportIcon></SupportIcon>}
              path="/app/ayuda"
              text="Ayuda"
            ></SidebarItem>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
