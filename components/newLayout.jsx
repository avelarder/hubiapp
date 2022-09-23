import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import HeaderApp from "./dashboard/header";
import SidebarItem from "./dashboard/sidebarItem";
import {
  ClipboardListIcon,
  CogIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

function NewLayout(props) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, loading]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <div className="flex  bg-gray-100 ">
          {/* Links */}
          <ul className="mt-3 flex flex-col items-center justify-start">
            {/* Dashboard */}
            <SidebarItem
              icon={
                <div className="flex items-center justify-center ">
                  <svg
                    className="absolute  text-purple-400 "
                    width="22"
                    height="22"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9461 7.35666L14.2739 5.41388C14.2237 5.36962 14.1836 5.31515 14.1562 5.25411C14.1288 5.19308 14.1147 5.1269 14.115 5.05999V2.28665C14.115 2.23302 14.0937 2.18159 14.0558 2.14366C14.0178 2.10574 13.9664 2.08443 13.9128 2.08443H12.4683C12.4418 2.08443 12.4155 2.08967 12.3909 2.09983C12.3664 2.10999 12.3441 2.12488 12.3253 2.14366C12.3065 2.16244 12.2917 2.18473 12.2815 2.20926C12.2713 2.2338 12.2661 2.2601 12.2661 2.28665V3.16054C12.2655 3.19876 12.2541 3.23603 12.2331 3.26802C12.2122 3.30001 12.1827 3.32542 12.1479 3.34129C12.1131 3.35717 12.0745 3.36286 12.0367 3.35771C11.9988 3.35256 11.9631 3.33679 11.9339 3.31221L9.15332 0.820543C9.0671 0.742892 8.95518 0.699921 8.83915 0.699921C8.72312 0.699921 8.6112 0.742892 8.52498 0.820543L0.724983 7.26999C0.269983 7.68166 0.60943 8.94555 1.22332 8.94555H1.8661C2.05764 8.94555 2.24134 9.02164 2.37678 9.15708C2.51223 9.29253 2.58832 9.47623 2.58832 9.66777V16.9767C2.58832 17.0303 2.60962 17.0817 2.64755 17.1197C2.68547 17.1576 2.73691 17.1789 2.79054 17.1789H14.9672C15.0208 17.1789 15.0723 17.1576 15.1102 17.1197C15.1481 17.0817 15.1694 17.0303 15.1694 16.9767V9.14055C15.1694 9.08691 15.1907 9.03548 15.2287 8.99755C15.2666 8.95963 15.318 8.93833 15.3716 8.93833H16.5778C17.1483 8.93833 17.365 7.73221 16.9461 7.35666ZM12.2733 11.3794C12.2677 11.4555 12.2532 11.5307 12.23 11.6033C12.2161 11.6604 12.1968 11.7161 12.1722 11.7694C12.1217 11.8994 12.0567 12.0222 12.0061 12.1233C11.6461 12.8319 11.0514 13.3935 10.3233 13.7122C9.76476 13.9798 9.15146 14.1134 8.53221 14.1022C7.97649 14.0633 7.43046 13.9365 6.91443 13.7267C6.21587 13.4508 5.60985 12.9825 5.16665 12.3761C4.88841 12.0355 4.73545 11.6098 4.73332 11.17C4.74848 11.0615 4.78611 10.9574 4.84382 10.8643C4.90152 10.7711 4.97803 10.6911 5.06844 10.6292C5.15885 10.5674 5.26117 10.5251 5.36887 10.505C5.47656 10.485 5.58726 10.4876 5.69387 10.5128C6.14887 10.6283 6.51721 11.1556 6.83498 11.4733C7.01947 11.6642 7.22271 11.836 7.44165 11.9861C7.735 12.1163 8.05237 12.1836 8.37332 12.1836C8.69426 12.1836 9.01164 12.1163 9.30498 11.9861C9.86832 11.7622 10.1428 11.1989 10.5761 10.8089C10.673 10.6704 10.8065 10.5615 10.9618 10.4947C11.117 10.4278 11.2878 10.4055 11.455 10.4302C11.6223 10.4549 11.7793 10.5258 11.9085 10.6348C12.0377 10.7437 12.134 10.8866 12.1867 11.0472C12.2243 11.1389 12.2439 11.237 12.2444 11.3361L12.2733 11.3794Z"
                      fill="rgb(124, 58, 237)"
                    />
                  </svg>
                  <svg
                    className="absolute   text-purple-400 "
                    width="45"
                    height="45"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4672 2.28833C19.0182 2.31185 21.5185 3.00255 23.7199 4.29179C25.9212 5.58103 27.7468 7.42391 29.0152 9.63727C30.2836 11.8506 30.9507 14.3574 30.9502 16.9085C30.9497 19.4595 30.2815 21.966 29.0122 24.1789C28.9244 24.3293 28.8985 24.508 28.94 24.6772L30.3844 30.3683C30.3857 30.3762 30.385 30.3842 30.3826 30.3918C30.3801 30.3994 30.3759 30.4063 30.3702 30.4119C30.3646 30.4175 30.3577 30.4218 30.3501 30.4242C30.3426 30.4267 30.3345 30.4273 30.3267 30.4261L24.65 29.0322C24.6192 29.0189 24.586 29.012 24.5525 29.012C24.5189 29.012 24.4858 29.0189 24.455 29.0322C22.1148 30.5994 19.3631 31.4388 16.5467 31.4444C12.6774 31.4559 8.96213 29.9299 6.21806 27.2021C3.47399 24.4743 1.92592 20.7681 1.91443 16.8989C1.90294 13.0297 3.42896 9.31436 6.15678 6.57029C8.8846 3.82622 12.5908 2.27816 16.46 2.26666L16.4672 2.28833Z"
                      stroke="rgb(124, 58, 237)"
                      strokeWidth="2.6"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              }
              path="/app/dashboard"
              text="Inicio"
            ></SidebarItem>
            <SidebarItem
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.9958 0.262711H11.6822C9.88282 0.262711 8.41949 1.72604 8.41949 3.52542V12.6382L0.740701 20.317C0.512622 20.5451 0.357307 20.8358 0.294389 21.1522C0.231472 21.4686 0.263778 21.7965 0.387222 22.0946C0.510667 22.3926 0.719708 22.6474 0.987919 22.8267C1.25613 23.0059 1.57147 23.1016 1.89407 23.1017V31.2585C1.89407 31.6911 2.06594 32.1061 2.37188 32.412C2.67782 32.718 3.09276 32.8898 3.52543 32.8898H29.6271C30.0598 32.8898 30.4747 32.718 30.7807 32.412C31.0866 32.1061 31.2585 31.6911 31.2585 31.2585V3.52542C31.2585 1.72604 29.7952 0.262711 27.9958 0.262711ZM14.9449 29.6271H5.15678V20.5144L10.0508 15.6203L14.9449 20.5144V29.6271ZM27.9958 29.6271H18.2076V23.1017C18.5306 23.1024 18.8465 23.0072 19.1152 22.828C19.3839 22.6489 19.5933 22.394 19.7169 22.0956C19.8405 21.7972 19.8726 21.4689 19.8093 21.1522C19.7459 20.8355 19.5899 20.5448 19.361 20.317L11.6822 12.6382V3.52542H27.9958V29.6271Z"
                    fill="rgb(124, 58, 237)"
                  />
                  <path
                    d="M14.9449 6.78813H18.2076V10.0508H14.9449V6.78813ZM21.4703 6.78813H24.7331V10.0508H21.4703V6.78813ZM21.4703 13.3641H24.7331V16.5763H21.4703V13.3641ZM21.4703 19.839H24.7331V23.1017H21.4703V19.839ZM8.41949 21.4703H11.6822V24.733H8.41949V21.4703Z"
                    fill="rgb(124, 58, 237)"
                  />
                </svg>
              }
              path="/app/comunidad"
              text="Comunidad"
            ></SidebarItem>
            <SidebarItem
              icon={
                <ShieldCheckIcon className="text-purple-600  w-8 h-8"></ShieldCheckIcon>
              }
              backgroundColor="bg-red-500"
              path="/app/seguridad"
              text="Seguridad"
            ></SidebarItem>
            <SidebarItem
              icon={
                <IdentificationIcon className="text-purple-600  w-8 h-8 "></IdentificationIcon>
              }
              path="/app/residentes"
              text="Residentes"
            ></SidebarItem>
            <SidebarItem
              icon={
                <UserGroupIcon className="text-purple-600  w-8 h-8"></UserGroupIcon>
              }
              path="/app/colaboradores"
              text="Equipo"
            ></SidebarItem>

            <SidebarItem
              icon={
                <ClipboardListIcon className="text-purple-600  w-8 h-8"></ClipboardListIcon>
              }
              path="/app/documentos"
              text="Documentos"
            ></SidebarItem>

            <SidebarItem
              icon={<CogIcon className="text-purple-600  w-8 h-8"></CogIcon>}
              path="/app/configuracion"
              text="Configuración"
            ></SidebarItem>
          </ul>
        </div>

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <HeaderApp
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={authUser}
          />

          <main>{props.children}</main>
        </div>
      </div>
    </>
  );
}

export default NewLayout;
