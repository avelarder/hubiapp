import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";
import Header from "../../components/dashboard/header";
import Footer from "../../components/dashboard/footer";
import MainSection from "../../components/dashboard/mainSection";
import Summary from "../../components/dashboard/summary";
import Sidebar from "../../components/dashboard/sidebar";

function Dashboard() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={authUser}
        ></Header>
      </div>
      <div>
        <MainSection>
          <Summary></Summary>
        </MainSection>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Dashboard;
