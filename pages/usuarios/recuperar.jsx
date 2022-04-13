import FieldContainer from "../../components/common/field-container";
import RoundedInputText from "../../components/common/RoundedInputText";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { useState } from "react"
import { toast } from "react-toastify";
import { useAuth } from "../../authUserProvider";

export default function Recuperar() {

    const { sendPasswordResetEmail } = useAuth();

    const [email, setEmail] = useState("")


    const handleOnConfirm = () => {

        if (!VALIDATIONS.EMAIL(email)) {

            toast.error("Correo Electrónico no es válido.");
            return;
        }

        var actionCodeSettings = {
            url: `http://localhost:3500/login`,
            handleCodeInApp: true
        };

        sendPasswordResetEmail(email, actionCodeSettings)

        toast.success("Exito, le hemos enviado un correo para restablecer su contraseña.");

        setEmail("")
    }
    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex flex-row justify-evenly">
                <div className="p-10 ">
                    <div className="box-content flex flex-col h-full w-100 p-4  rounded-md ">
                        <div className="box-content flex text-center justify-center font-bold ">
                            <p className=" text-purple-600 text-center text-3xl">Ayuda con la contraseña</p>
                        </div>
                        <p className="flex  mt-4 text-center ">Te enviaremos un correo con un código de activación que estará activo por 30 minutos.</p>
                        <p className="flex  text-center">Escribe el correo electrónico asociado a tu cuenta HUBI.</p>

                        <FieldContainer>
                            <RoundedInputText
                                validator={{
                                    validate: (content) => {
                                        return VALIDATIONS.EMAIL(content)
                                    },
                                    message: "Ingrese su correo electrónico."
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                placeholder="ejemplo@ejemplo.com"
                                type="email"
                            ></RoundedInputText>
                        </FieldContainer>

                        <div className="box-content text-center  pt-5 pb-5">
                            <button
                                onClick={handleOnConfirm}
                                className="h-10 w-96 rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700 font-semibold"
                            >
                                Confirmar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
