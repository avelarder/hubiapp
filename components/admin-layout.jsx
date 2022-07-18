import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import HeaderApp from "./dashboard/header";
import Sidebar from "./dashboard/sidebar";
import { Container } from "./admin/base-ui-components";

function AdminLayout(props) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, loading]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Content area */}
      <div className="flex w-full h-screen justify-center">
        <div className="flex w-1/6 "></div>
        <div className="flex w-4/6 h-screen items-center ">
          {props.children}
        </div>
        <div className="flex w-1/6 "></div>
      </div>
    </>
  );
}

export default AdminLayout;
