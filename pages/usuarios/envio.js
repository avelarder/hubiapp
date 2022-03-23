import FieldContainer from "../../components/common/field-container";
import RoundedInputText from "../../components/common/RoundedInputText";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { useState } from "react"
import { useRouter } from "next/router";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import Loader from "../../components/common/loader";
import Firebase from "../../firebase";
import { toast } from "react-toastify";

export default function Envio() {

    const [activationCode, setActivationCode] = useState("")
    const router = useRouter();
    const { query } = router;
    let activationEntry = {};
    const db = Firebase.default.firestore();

    const { data, status, error } = useFirestoreQuery(
        db.collection("ActivationRecords").doc(query.uuid)
    );

    if (status === "loading") {
        return <Loader></Loader>;
    }
    if (status === "error") {
        return <div>Lo sentimos pero no podemos verificar su cuenta, contáctese con su Administrador.</div>;
    }
    if (data === null) {
        return <Loader></Loader>;
    }
    if (data) {
        if (data.expired) {
            router.push('/login');
            return (<div>Su cuenta ya está activa, por favor inicie sesión.</div>);;
        }

        activationEntry = {
            id: data.id,
            activationHash: data.activationHash,
            code: data.code,
            expired: data.expired,
        };


    }

    const handleOnVerification = async () => {

        if (activationEntry.code === activationCode && !activationEntry.expired && query.hash === activationEntry.activationHash) {

            try {

                await db.collection("ActivationRecords")
                    .doc(query.uuid)
                    .update({
                        expired: true,
                        expiredOnUTC: new Date().toISOString(),
                    });
                console.log("Updated")
            } catch (error) {
                console.log(error)
            }

            toast.success("Su cuenta ha sido verificada con éxito.");

        }
        else
            toast.error("El código de verificación no es válido o su cuenta no puede activarse.");
    }
    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex flex-row justify-evenly">
                <div className="p-10 ">
                    <div className="box-content flex flex-col h-full w-100 p-4  rounded-md ">
                        <div className="box-content flex text-center justify-center font-bold ">
                            <p className=" text-purple-600 text-center text-3xl">Verifiquemos tu correo electrónico</p>
                        </div>
                        <p className="flex  mt-4 text-center">Por favor ingrese el código de verificación de 7 dígitos enviado a tu correo.</p>
                        <p className="flex  text-center">El código estará activo por 30 minutos.</p>

                        <FieldContainer>
                            <RoundedInputText
                                validator={{
                                    validate: (content) => {
                                        return VALIDATIONS.ACTIVATION_CODE(content)
                                    },
                                    message: "Ingrese el código de activación."
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
