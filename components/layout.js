import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import Header from "../components/dashboard/header";
import Sidebar from "../components/dashboard/sidebar";

function Layout(props) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={authUser}
        />

        <main>{props.children}</main>
      </div>
    </div>
  );
}

export default Layout;
