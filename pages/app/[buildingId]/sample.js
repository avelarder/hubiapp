import React from "react";
import { useRouter } from "next/router";

function Sample() {
  const router = useRouter();
  const currentBuilding = router.query.buildingId;

  return <div>{"Hello " + currentBuilding}</div>;
}

export default Sample;
