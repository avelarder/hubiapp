import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";
import Header from "../../components/dashboard/header";
import Footer from "../../components/dashboard/footer";
import MainSection from "../../components/dashboard/mainSection";
import Tile from "../../components/dashboard/tile";
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

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div>
              <MainSection>
                <Tile title="Edificios" value="23"></Tile>
                <Tile title="Agentes" value="250"></Tile>
                <Tile title="Morosidad" value="25%"></Tile>
              </MainSection>
            </div>
            <div>
              <Footer></Footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
