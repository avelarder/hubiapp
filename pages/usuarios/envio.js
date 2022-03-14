
export default function Envio() {

    const handleOnLogin = () => {
        router.push("/login");
    }
    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex flex-row justify-evenly">
                <div className="p-10 ">
                    <div className="box-content flex flex-col h-full w-100 p-4  rounded-md ">
                        <div className="box-content flex text-center justify-center font-bold ">
                            <p className=" text-purple-600 text-center text-3xl">Estamos a un paso de activar tu usuario</p>
                        </div>
                        <p className="flex  mt-4 text-center">Te enviamos un email a tu correo electrónico, sigue los pasos indicados para completar tu registro.</p>
                        <div className="box-content text-center  pt-5 pb-5">
                            <button
                                onClick={handleOnLogin}
                                className="h-10 w-96 rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
                            >
                                Inicia Sesión
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
