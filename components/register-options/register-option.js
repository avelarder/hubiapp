import React from "react";
import RegisterItem from "./register-item";

const admin_options = ["Option 1", "Option 2", "Option 3", "Option 4"];
const regular_options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
];

function RegisterOption() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="block p-10">
          <RegisterItem
            title="Administrador"
            desc="Dentro de la plataforma encontrarás herramientas para la gestión fácil e intuitiva de condominios y/o edificios."
            action="Registrate"
            options={admin_options}
            to="/register/admin-register"
          ></RegisterItem>
        </div>
        <div className="block p-10">
          <RegisterItem
            title="Propietario"
            desc="Interactúa con tu comunidad, solicita servicios para tu propiedad, obten las últimas noticias, compra y vende artículos y mucho más."
            action="Registrate"
            options={regular_options}
            to="/register/user-register"
          ></RegisterItem>
        </div>
      </div>
    </div>
  );
}

export default RegisterOption;
