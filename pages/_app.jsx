import "tailwindcss/tailwind.css";
import { AuthUserProvider } from "../authUserProvider";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { LocationProvider } from "../locationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <LocationProvider>
        <Head>
          <title>Hubi - Portal de Administación</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </LocationProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
