import "tailwindcss/tailwind.css";
import { AuthUserProvider } from "../authUserProvider";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Head>
        <title>Hubi - Portal de Administación</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
