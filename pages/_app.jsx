import "tailwindcss/tailwind.css";
import { AuthUserProvider } from "../authUserProvider";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Head>
        <title>Hubi - Portal de Administación</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthUserProvider>
  );
}

export default MyApp;
