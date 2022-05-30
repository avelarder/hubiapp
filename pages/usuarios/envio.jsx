import FieldContainer from "../../components/common/field-container";
import RoundedInputText from "../../components/common/roundedInputText";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { useState } from "react";
import { useRouter } from "next/router";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import Loader from "../../components/common/loader";
import Firebase from "../../firebase";
import { toast } from "react-toastify";
import { paths } from "../../utils/paths";
import {
  Container,
  PageHeader,
  StyledButton,
} from "../../components/admin/base-ui-components";
import { useAuth } from "../../authUserProvider";

export default function Envio() {
  const [activationCode, setActivationCode] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const router = useRouter();
  const { query } = router;
  let activationEntry = {};
  const db = Firebase.default.firestore();
  const { sendPasswordResetEmail } = useAuth();

  const { data, status, error } = useFirestoreQuery(
    db.collection("ActivationRecords").doc(query.uuid)
  );

  const handleActivationRecord = async (userId) => {
    const db = Firebase.default.firestore();
    await db
      .collection("ActivationRecords")
      .doc(userId)
      .update({
        passwordReset: true,
        passwordResetOnUTC: new Date().toISOString(),
      });
  };

  const onChangePasswordClicked = async () => {
    setButtonEnabled(false);

    await sendPasswordResetEmail(query.email);
    await handleActivationRecord(query.uuid);

    toast.success(
      "Se ha enviado un correo con los pasos para cambiar su contraseña."
    );
  };

  if (status === "loading") {
    return <Loader></Loader>;
  }
  if (status === "error") {
    return (
      <div>
        Lo sentimos pero no podemos verificar su cuenta, contáctese con su
        Administrador.
      </div>
    );
  }
  if (data === null) {
    return <Loader></Loader>;
  }
  if (data) {
    if (data.expired) {
      if (data.passwordReset) {
        return (
          <Container>
            <PageHeader>Revise su casilla de correo.</PageHeader>
            <span className="flex mt-4 text-center md:w-2/3">
              Le hemos enviado un correo con los pasos para que pueda cambiar su
              contraseña. Está a un paso de acceder a HUBI y conectar con su
              comunidad.
            </span>
          </Container>
        );
      }
      if (!data.passwordReset) {
        return (
          <Container>
            <PageHeader>
              Su cuenta está activa pero aún no ha cambiado su contraseña.
            </PageHeader>
            <span className="flex mt-4 text-center md:w-2/3">
              El cambio de su contraseña es requerido ya que su cuenta fue
              creada con una contraseña temporal. Haciendo click en el siguiente
              enlace recibirá un mail con los pasos necesarios.
            </span>
            {buttonEnabled && (
              <StyledButton onClick={onChangePasswordClicked}>
                Cambiar contraseña.
              </StyledButton>
            )}
          </Container>
        );
      }
    }
    activationEntry = {
      id: data.id,
      activationHash: data.activationHash,
      code: data.code,
      expired: data.expired,
    };
  }

  const handleOnVerification = async () => {
    if (
      activationEntry.code === activationCode &&
      !activationEntry.expired &&
      query.hash === activationEntry.activationHash
    ) {
      try {
        await db
          .collection("ActivationRecords")
          .doc(query.uuid)
          .update({
            expired: true,
            expiredOnUTC: new Date().toISOString(),
            emailValidated: true,
            emailValidatedOnUTC: new Date().toISOString(),
          });
      } catch (error) {
        console.error(error);
      }

      toast.success("Su cuenta ha sido verificada con éxito.");
    } else
      toast.error(
        "El código de verificación no es válido o su cuenta no puede activarse."
      );
  };
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content flex flex-col h-full w-100 p-4  rounded-md ">
            <div className="box-content flex text-center justify-center font-bold ">
              <p className=" text-purple-600 text-center text-3xl">
                Verifiquemos tu correo electrónico
              </p>
            </div>
            <p className="flex  mt-4 text-center">
              Por favor ingrese el código de verificación de 7 dígitos enviado a
              tu correo.
            </p>
            <p className="flex  text-center">
              El código estará activo por 30 minutos.
            </p>

            <FieldContainer>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.ACTIVATION_CODE(content);
                  },
                  message: "Ingrese el código de activación.",
                }}
                value={activationCode}
                onChange={(e) => setActivationCode(e.currentTarget.value)}
                placeholder="Ingreso el código de activación"
                type="password"
              ></RoundedInputText>
            </FieldContainer>

            <div className="box-content text-center  pt-5 pb-5">
              <button
                onClick={handleOnVerification}
                className="h-10 w-96 rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700 font-semibold"
              >
                Verificar y Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
