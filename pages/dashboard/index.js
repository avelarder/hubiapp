import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";

function Dashboard() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return <div>Dashboard</div>;
}

export default Dashboard;
