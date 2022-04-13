import { useState } from "react";
import { VALIDATIONS } from "../../utils/UI-Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../authUserProvider";
import RoundedInputText from "../../components/common/RoundedInputText";
import FieldContainer from "../../components/common/field-container";
import Firebase from "../../firebase";
import MD5 from "crypto-js/md5";
import Mod9710 from "../../utils/iso7064";
import { toast } from "react-toastify";

export default function Crear() {
  const sendGridTemplateId =
    process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const { createUserWithEmailAndPassword } = useAuth();

  const handleOnCreateUser = async (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (
      VALIDATIONS.REQUIRED_FREE_TEXT(password) &&
      VALIDATIONS.REQUIRED_FREE_TEXT(confirmPassword) &&
      VALIDATIONS.PASSWORD(password) &&
      password === confirmPassword
    ) {
      createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
          const activation = await handleActivationRecord(authUser.user.uid);

          const body = {
            to: email,
            templateId: sendGridTemplateId,
            code: activation.code,
            hash: activation.activationHash,
            uuid: authUser.user.uid,
          };

          const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
          });

          if (response.status === 202) {
            toast.success(
              "Usuario creado con éxito, le hemos enviado un correo para activar su cuenta."
            );
            router.push(
              `/usuarios/envio?uuid=${authUser.user.uid}&hash=${activation.activationHash}`
            );
          } else {
            toast.error(
              "No pudimos enviarte en codigo de activación, por favor intente más tarde."
            );
          }
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
  };

  const handleActivationRecord = async (userId) => {
    const code = Mod9710.encode(Math.floor(Math.random() * 100000));
    const activationHash = MD5(userId + "|" + code).toString();

    const db = Firebase.default.firestore();
    await db
      .collection("ActivationRecords")
      .doc(userId)
      .set({
        code: code,
        activationHash: activationHash,
        createdOnUTC: new Date().toISOString(),
        expired: false,
        registered: false,
        welcomed: false,
        expiredOnUTC: null,
        registeredOnUTC: null,
        welcomedOnUTC: null,
      });

    return { code, activationHash };
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4  rounded-md ">
            <div className="box-content text-left font-bold ">
              <p className=" text-purple-600 self-start   text-3xl">
                El Poder de la Conexión
              </p>
              <p className=" text-purple-600 self-start   text-xl">
                Crea una cuenta en HUBI
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
                  placeholder="Ingresa tu correo electónico"
                ></RoundedInputText>
              </FieldContainer>
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.PASSWORD(content);
                    },
                    message: "Ingrese su contraseña.",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Ingrese su Contraseña"
                  type="password"
                ></RoundedInputText>
              </FieldContainer>
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.PASSWORD(content);
                    },
                    message: "Confirme su contraseña.",
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  placeholder="Confirme su Contraseña"
                  type="password"
                ></RoundedInputText>
                <div className="flex flex-col items-start text-left">
                  <span className="flex font-semibold text-xs my-4">
                    Requisitos para una contraseña segura:
                  </span>
                  <ul className="text-xs">
                    <li className="list-disc">
                      Debe contener por lo menos un dígito [0-9].
                    </li>
                    <li className="list-disc">
                      Debe contener por lo menos un caracter en minúscula [a-z].
                    </li>
                    <li className="list-disc">
                      Debe contener por lo menos un caracter en mayúscula [A-Z].
                    </li>
                    <li className="list-disc">
                      Debe contener por lo menos un caracter especial como ! @ #
                      & ( ).
                    </li>
                    <li className="list-disc">
                      Debe contener una longitud de entre 8 y 20 caracteres.
                    </li>
                  </ul>
                </div>
              </FieldContainer>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <button
                onClick={handleOnCreateUser}
                className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700 font-semibold"
              >
                Crear tu cuenta en HUBI
              </button>
              <p className="w-96 text-sm mt-4">
                Al hacer click en Crear Cuenta aceptas nuestras{" "}
                <Link href="/politica/condiciones" passHref>
                  <span className="text-purple-700 font-semibold cursor-pointer">
                    Condiciones
                  </span>
                </Link>
                ,{" "}
                <Link href="/politica/datos" passHref>
                  <span className="text-purple-700 font-semibold cursor-pointer">
                    Política de Datos
                  </span>
                </Link>{" "}
                y{" "}
                <Link href="/politica/cookies" passHref>
                  <span className="text-purple-700 font-semibold cursor-pointer">
                    Política de Cookies
                  </span>
                </Link>
                . Es posible que te enviemos notificaciones por SMS que puedes
                desactivar cuando quieras.
              </p>
            </div>
            <div className="box-content flex flex-col pt-5 pb-5 items-center">
              <span className="mt-2 text-sm">
                Ya eres usuario?{" "}
                <Link href="/login" passHref>
                  <span className="text-purple-700 font-semibold cursor-pointer">
                    Inicia sesión
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
