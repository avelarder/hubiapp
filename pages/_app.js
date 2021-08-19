import "tailwindcss/tailwind.css";
import { AuthUserProvider } from "../authUserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
