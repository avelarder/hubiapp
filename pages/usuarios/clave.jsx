import React, { useState } from "react";
import { useRouter } from "next/router";
import RoundedInputText from "../../components/common/roundedInputText";
import FieldContainer from "../../components/common/field-container";
import { toast } from "react-toastify";
import { useAuth } from "../../authUserProvider";
import { VALIDATIONS } from "../../utils/UI-Constants";
import ReCAPTCHA from "react-google-recaptcha";
import Firebase from "../../firebase";
import { StyledButton } from "../../components/admin/base-ui-components";

function Clave() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  const [captcha, setCaptcha] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { confirmPasswordReset } = useAuth();

  const router = useRouter();
  const { query } = router;

  function onChange(value) {
    setCaptcha(value);
  }

  const handleOnCreateUser = async (event) => {
    if (!VALIDATIONS.REQUIRED_FREE_TEXT(captcha)) {
      toast.warning("Por favor, seleccione la opción - No soy un robot.");
      return;
    }

    if (
      VALIDATIONS.PASSWORD(password) &&
      VALIDATIONS.PASSWORD(confirmPassword) &&
      VALIDATIONS.PASSWORD(password) &&
      password === confirmPassword &&
      VALIDATIONS.REQUIRED_FREE_TEXT(query.oobCode)
    ) {
      confirmPasswordReset(query.oobCode, password).then(() => {
        toast.success("Contraseña cambiada con éxito");
        router.push("/usuarios/exito");
      });
    } else {
      toast.error(
        "Tus contraseñas no coinciden o tu código de seguridad no es correcto, por favor corregir."
      );
    }
    event.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4  rounded-md ">
            <div className="box-content text-left font-bold ">
              <p className=" text-purple-600 self-start   text-3xl">
                Crear nueva contraseña
              </p>
            </div>
            <div className="box-content text-center  pt-5 pb-5">
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
                  placeholder="Ingrese su contraseña"
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
                  placeholder="Confirme su contraseña"
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
            <div className="flex w-full justify-center pt-5 pb-5">
              <ReCAPTCHA sitekey={recaptchaKey} onChange={onChange} />
            </div>
            <div className="box-content text-center  pt-5 pb-5">
              <StyledButton
                onClick={handleOnCreateUser}
                className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700 font-semibold"
              >
                Confirmar
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clave;
