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
      <Container>
        {/* Content area */}
        <div className="flex w-full ">
          <div className="flex w-1/4 "></div>
          <div className="flex flex-1 m-6">{props.children}</div>
          <div className="flex w-1/4 "></div>
        </div>
      </Container>
    </>
  );
}

export default AdminLayout;
