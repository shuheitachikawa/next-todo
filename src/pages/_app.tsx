import "../styles/globals.css";
import { AppProps } from "next/app";
import { Amplify, API, withSSRContext } from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
