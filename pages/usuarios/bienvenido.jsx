import React from "react";
import { useRouter } from "next/router";
import { CheckIcon } from "@heroicons/react/solid";
import Firebase from "../../firebase";
import { useAuth } from "../../authUserProvider";
import { StyledButton } from "../../components/admin/base-ui-components";

function Welcome() {
  const history = useRouter();
  const { authUser } = useAuth();

  const handleOnRedirectDashboard = async () => {
    const db = Firebase.default.firestore();
    const userId = authUser.uid;

    await db.collection("ActivationRecords").doc(userId).update({
      welcomed: true,
      welcomedOnUTC: new Date().toISOString(),
    });

    history.push("/app/dashboard");
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="flex  flex-col p-10 items-center">
          <div className="box-content flex flex-col h-full w-100 p-4  rounded-md  w-96 ">
            <div className="box-content flex text-center justify-center  ">
              <CheckIcon className="w-10 h-10 mr-1 text-green-500"></CheckIcon>
              <span className=" text-gray-900 text-center text-3xl font-bold">
                Bienvenido a HUBI
              </span>
            </div>
            <p className="flex self-center text-center mt-4 text-sm">
              Comienza tu viaje por HUBI tu socio que te da el poder de vivir
              mejor.
            </p>
          </div>
          <div className="box-content flex  h-full w-100 p-4  rounded-md  w-96 ">
            <p className="flex self-center text-center mt-4 text-sm">
              Comienza tu viaje por HUBI tu socio que te da el poder de vivir
              mejor.
            </p>
            <CheckIcon className="w-10 h-10 mr-1 text-green-500"></CheckIcon>
          </div>
          <div className="box-content flex  h-full w-100 p-4  rounded-md  w-96 ">
            <p className="flex self-center text-center mt-4 text-sm">
              Comienza tu viaje por HUBI tu socio que te da el poder de vivir
              mejor.
            </p>
            <CheckIcon className="w-10 h-10 mr-1 text-green-500"></CheckIcon>
          </div>
          <div className="box-content flex  h-full w-100 p-4  rounded-md  w-96 ">
            <p className="flex self-center text-center mt-4 text-sm">
              Comienza tu viaje por HUBI tu socio que te da el poder de vivir
              mejor.
            </p>
            <CheckIcon className="w-10 h-10 mr-1 text-green-500"></CheckIcon>
          </div>
          <div className="box-content text-center  pt-5 pb-5">
            <StyledButton onClick={handleOnRedirectDashboard}>
              Continuar
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
