import React from "react";

function AdminRegister() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4 border-4 rounded-md bg-gray-30">
            <div className="box-content text-center font-sans text-4xl font-bold ">
              <h1 className="pb-4">Registro de Administradores</h1>
            </div>
            <div className="box-content text-center font-sans pt-5 pb-5">
              <input
                className="mb-2 w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                placeholder="Ingresa tu email"
              ></input>
              <input
                type="password"
                placeholder="Contraseña"
                className="mb-2 w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              ></input>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className="mb-2 w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              ></input>
            </div>
            <div className="box-content text-center font-sans pt-5 pb-5">
              <button
                onClick={(e) => handleClick(e, "#")}
                className="h-10 w-max rounded-full px-20 bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
        <div className="p-10">
          <h4 className="font-bold text-3xl pb-6">Al registrarte tu podrás:</h4>
          <ul className="list-disc">
            <li>Dar de alta tu urbanización, condominio o edificio</li>
            <li>Gestión de servicios</li>
            <li>Registro de personal</li>
            <li>Invitar usuarios a tu red</li>
          </ul>
          <a className="text-purple-800" href="#">
            ver más
          </a>
          <hr className="mt-4 mb-4"></hr>

          <h4>
            Revisa tu casilla de correo, continúa con tu registro desde allí.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
