import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";
import Header from "./header";
import Footer from "./footer";
import MainSection from "../../components/dashboard/mainSection";
import Summary from "../../components/dashboard/summary";

function Dashboard() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div>
      <div>
        <Header user={authUser} appName=", tu comunidad en línea."></Header>
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
