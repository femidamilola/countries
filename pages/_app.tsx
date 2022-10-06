import { NextComponentType, NextPageContext } from "next";
import App from "next/app";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";

interface MyAppProps extends App {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
