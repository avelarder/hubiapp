import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../authUserProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/app/dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-row justify-evenly">
        <div className="p-10 ">
          <div className="box-content h-full w-100 p-4 border-4 rounded-md bg-gray-30">
            <div className="box-content text-center font-sans text-4xl font-bold ">
              <h1 className="pb-4">Bienvenido!</h1>
            </div>
            <div className="box-content text-center font-sans pt-5 pb-5">
              <input
                className="mb-2 w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              ></input>
              <input
                type="password"
                placeholder="Contraseña"
                className="mb-2 w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              ></input>
            </div>
            <div className="box-content text-center font-sans pt-5 pb-5">
              <button
                onClick={onSubmit}
                className="h-10 w-max rounded-full px-20 bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
              >
                Ingresar
              </button>
            </div>
            <div className="box-content text-center font-sans pt-5 pb-5">
              <div>No te has registrado aún?</div>
              <button
                onClick={onSubmit}
                className="h-10 w-max  px-20 bg-opacity-100 text-purple-600 hover:text-purple-800"
              >
                <Link href="/">Puedes hacerlo desde aquí.</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
