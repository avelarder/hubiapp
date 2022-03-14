import { useState } from "react";
import { VALIDATIONS } from "../../utils/UI-Constants";
import Link from "next/link"
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";
import RoundedInputText from "../../components/common/RoundedInputText";
import FieldContainer from "../../components/common/field-container";

export default function Crear() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const { createUserWithEmailAndPassword } = useAuth();

  const handleOnCreateUser = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (VALIDATIONS.REQUIRED_FREE_TEXT(password)) {
      createUserWithEmailAndPassword(email, password)
        .then((authUser) => {

          router.push("/usuarios/envio");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    } else {
      setError("Password do not match");
    }
    event.preventDefault();
  };

  const handleOnForgetPassword = () => {
    router.push("/usuarios/recuperar");
  }
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4  rounded-md ">
            <div className="box-content text-left font-bold ">
              <p className=" text-purple-600 self-start   text-3xl">El Poder de la Conexión</p>
              <p className=" text-purple-600 self-start   text-xl">Crea una cuenta en HUBI</p>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.EMAIL(content)
                    },
                    message: "Correo Electrónico es requerido."
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="Ingresa tu correo electónico"></RoundedInputText>
              </FieldContainer>
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.REQUIRED_FREE_TEXT(content)
                    },
                    message: "Ingrese su contraseña."
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Ingrese su Contraseña"
                  type="password"
                ></RoundedInputText>
              </FieldContainer>
            </div>
            <div className="flex  justify-end">
              <button
                onClick={handleOnForgetPassword}
                className="h-10 items-end text-sm"
              >
                Olvidaste tu contraseña?
              </button>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <button
                onClick={handleOnCreateUser}
                className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Crear cuenta
              </button>
              <p className="w-96 text-sm mt-4">Al hacer click en "Crear Cuenta" aceptas nuestras <Link href="/politica/condiciones" passHref><span className="text-purple-700 font-semibold cursor-pointer">Condiciones</span></Link>, <Link href="/politica/datos" passHref><span className="text-purple-700 font-semibold cursor-pointer">Política de Datos</span></Link> y <Link href="/politica/cookies" passHref><span className="text-purple-700 font-semibold cursor-pointer">Política de Cookies</span></Link>. Es posible que te enviemos notificaciones por SMS que puedes desactivar cuando quieras.</p>
            </div>
            <div className="box-content flex flex-col pt-5 pb-5 items-center">
              <span className="mt-2 text-sm">Ya eres usuario? <Link href="/login" passHref><span className="text-purple-700 font-semibold cursor-pointer">Inicia sesión</span></Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
