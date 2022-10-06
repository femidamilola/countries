import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const apolloClient = new ApolloClient({
  uri: `${publicRuntimeConfig.apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default apolloClient;
