import React from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
function Sample() {
  const router = useRouter();
  const currentBuilding = router.query.buildingId;

  return <div>{"Hello " + currentBuilding}</div>;
}

export default Sample;
