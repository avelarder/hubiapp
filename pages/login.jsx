import { useState } from "react";
import { VALIDATIONS } from "../utils/UI-Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../authUserProvider";
import RoundedInputText from "../components/common/roundedInputText";
import FieldContainer from "../components/common/field-container";
import Firebase from "../firebase";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import Image from "next/image";
export default function Login() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  const [captcha, setCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  function onChange(value) {
    setCaptcha(value);
  }

  const handleOnSubmitClicked = (event) => {
    if (!VALIDATIONS.EMAIL(email) || !VALIDATIONS.PASSWORD(password)) {
      toast.warning(
        "Por favor, ingrese su correo electrónico y su contraseña."
      );
      return;
    }
    if (!VALIDATIONS.REQUIRED_FREE_TEXT(captcha)) {
      toast.warning("Por favor, seleccione la opción - No soy un robot.");
      return;
    }

    signInWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        const db = Firebase.default.firestore();
        const activationRef = db
          .collection("ActivationRecords")
          .doc(authUser.user.uid);
        const doc = await activationRef.get();

        if (doc.exists && (doc.data().registered || doc.data().welcomed))
          router.push("/app/dashboard");
        else if (doc.exists && !doc.data().registered)
          router.push("/usuarios/registro");
        else router.push("/usuarios/bienvenido");
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Error al iniciar sesión. Por favor, intente nuevamente.");
      });
    event.preventDefault();
  };

  const handleOnRemindMe = () => {};

  const handleOnForgetPasword = () => {
    router.push("/usuarios/recuperar");
  };
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4  rounded-md ">
            <div className="box-content text-center  font-bold ">
              <Image
                src={"/illustrations/undraw_connection_re_lcud.svg"}
                width={200}
                height={200}
                alt="undraw_connection_re_lcud"
              ></Image>
              <p className=" text-purple-600 self-start text-3xl">
                El Poder de la Conexión.
              </p>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.EMAIL(content);
                    },
                    message: "Correo Electrónico es requerido.",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="Ingresa tu correo electrónico"
                ></RoundedInputText>
              </FieldContainer>
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.REQUIRED_FREE_TEXT(content);
                    },
                    message: "Ingrese su contraseña.",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Ingrese su contraseña"
                  type="password"
                ></RoundedInputText>
              </FieldContainer>
            </div>
            <div className="flex  justify-end">
              <button
                onClick={handleOnForgetPasword}
                className="h-10 items-end text-sm text-purple-700 hover:text-purple-900"
              >
                Olvidaste tu contraseña?
              </button>
            </div>
            <div className="flex w-full justify-center pt-5 pb-5">
              <ReCAPTCHA sitekey={recaptchaKey} onChange={onChange} />
            </div>
            <div className="box-content text-center   pt-5 pb-5">
              <button
                onClick={handleOnSubmitClicked}
                className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="box-content flex flex-col pt-5 pb-5 align-bottom">
              <div>
                <input type={"checkbox"} onClick={handleOnRemindMe}></input>
                <span className="mb-4 text-sm"> Recordame</span>
              </div>
              <span className="mt-2 text-sm ">
                Eres nuevo usuario?{" "}
                <Link href="/usuarios/seleccion" passHref>
                  <span className="cursor-pointer text-purple-700  hover:text-purple-900">
                    Empieza aquí.
                  </span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
