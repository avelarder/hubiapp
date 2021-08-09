import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ActivationModal from "./activationModal";

function Activate() {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);

  const validateToken = (token, type) => {
    //TODO: Call to Firebase to verify activation token.

    console.log("token: " + token);
    console.log("type: " + type);
    return Math.random() > 0.5;
  };

  const activationToken = router.query.token;
  const activationType = router.query.type;

  const Activate = () => {
    setModalShow((prev) => (prev = true));
  };

  if (!validateToken(activationToken, activationType)) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-row justify-evenly">
          <div className="justify-evenly p-10">
            <h1 className="box-content text-center font-sans text-4xl font-bold  pb-5">
              Código de Activación incorrecto.
            </h1>
            <div className="justify-evenly p-10">
              <p className="pb-5">Por favor, verifique los siguiente:</p>
              <ul className="list-disc">
                <li>El enlace de activación no haya expirado.</li>
                <li>El enlace no haya sido ya utilizado.</li>
                <li>El enlace no haya sido ya utilizado.</li>
              </ul>
              <p className="pt-5">
                Si el problema persiste, regístrese nuevamente para solicitar un
                nuevo enlace de activación.
              </p>
              <button
                onClick={(e) => {
                  router.push("/");
                }}
                className="h-10 w-max rounded-full px-20 bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Registro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="justify-evenly p-10">
          <h1 className="box-content text-center font-sans text-4xl font-bold  pb-5">
            Estás a un paso de activar tu cuenta
          </h1>
          <div className="box-content text-center font-sans text-lg">
            {activationType === "administrator" && (
              <p>
                Por favor, completa tu perfil para una mejor experiencia en la
                plataforma.
              </p>
            )}
            {activationType === "usuario" && (
              <div>
                <p>
                  Por favor, completa tu perfil para una mejor experiencia en la
                  plataforma.
                </p>
                <p>
                  Recuerda que inicialmente vas a tener acceso a tu red de
                  vecinos, los cuales también perteneces al mismo condominio.
                </p>
              </div>
            )}
            <br></br>
            <button
              onClick={(e) => {
                Activate();
              }}
              className="h-10 w-max rounded-full px-20 bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
            >
              Activa ahora!
            </button>
          </div>
        </div>
      </div>
      <ActivationModal
        show={modalShow}
        onClose={() => setModalShow(false)}
      ></ActivationModal>
    </div>
  );
}

export default Activate;
