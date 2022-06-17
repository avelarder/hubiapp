import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import HeaderApp from "./dashboard/header";
import Sidebar from "./dashboard/sidebar";

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
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
