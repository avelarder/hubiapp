import { useState } from "react";
import { VALIDATIONS } from "../utils/UI-Constants";
import Link from "next/link"
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import RoundedInputText from "../components/common/RoundedInputText";
import FieldContainer from "../components/common/field-container";
import Firebase from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const handleOnSubmitClicked = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then(async (authUser) => {

        const db = Firebase.default.firestore();
        const data = await db.collection("ActivationRecords").doc(authUser.uuid).get()
        const record = await data.data();
        console.log(record)
        if (record.registered)
          router.push("/app/dashboard");
        else
          router.push("/usuarios/registro");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  const handleOnRemindMe = () => {

  }

  const handleOnForgetPasword = () => {
    router.push("/usuarios/recuperar");
  }
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4  rounded-md ">
            <div className="box-content text-left   font-bold ">
              <p className=" text-purple-600 self-start text-3xl">El Poder de la Conexión.</p>
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
                onClick={handleOnForgetPasword}
                className="h-10 items-end text-sm"
              >
                Olvidaste tu contraseña?
              </button>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <button
                onClick={handleOnSubmitClicked}
                className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="box-content flex flex-col pt-5 pb-5 align-bottom">
              <div>
                <input
                  type={"checkbox"}
                  onClick={handleOnRemindMe}
                >
                </input>
                <span className="mb-4 text-sm"> Recordame</span>
              </div>
              <span className="mt-2 text-sm "> Eres nuevo usuario? <Link href="/usuarios/crear" passHref><span className="cursor-pointer text-purple-700 font-semibold">Empieza aquí.</span></Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
