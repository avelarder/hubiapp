import FieldContainer from "../../components/common/field-container";
import RoundedInputText from "../../components/common/RoundedInputText";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { useState } from "react"
import { useRouter } from "next/router";

export default function Envio() {

    const [activationCode, setActivationCode] = useState("")
    const router = useRouter();

    const handleOnLogin = () => {
        router.push("/usuarios/registro");
    }
    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex flex-row justify-evenly">
                <div className="p-10 ">
                    <div className="box-content flex flex-col h-full w-100 p-4  rounded-md ">
                        <div className="box-content flex text-center justify-center font-bold ">
                            <p className=" text-purple-600 text-center text-3xl">Verifiquemos tu correo electrónico</p>
                        </div>
                        <p className="flex  mt-4 text-center">Por favor ingrese el código de verificación de 6 dígitos enviado a tu correo.</p>
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
                                onClick={handleOnLogin}
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
