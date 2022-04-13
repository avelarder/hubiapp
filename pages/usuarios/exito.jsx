import React from "react";
import { useRouter } from "next/router";
import { CheckIcon } from "@heroicons/react/solid";
function Success() {
  const history = useRouter();

  const handleOnRedirectLogin = () => {
    history.push("/login");
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="flex  flex-col p-10 items-center">
          <div className="box-content flex flex-col h-full w-100 p-4  rounded-md border-1 border-purple-300 w-64 ">
            <div className="box-content flex text-center justify-center  ">
              <CheckIcon className="w-10 h-10 mr-1 text-green-500"></CheckIcon>
              <span className=" text-green-500 text-center text-3xl font-bold">
                Correcto
              </span>
            </div>
            <p className="flex self-center mt-4 text-sm">
              Se ha modificado su contraseña.
            </p>
          </div>
          <div className="box-content text-center  pt-5 pb-5">
            <button
              onClick={handleOnRedirectLogin}
              className="h-10 w-64 rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700 font-semibold"
            >
              Inciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
