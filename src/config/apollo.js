import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";

const httpLink = createHttpLink({
  // uri: "https://catstronauts-server-production-4829.up.railway.app/",
  uri: "http://localhost:4000/",
  fetch,
});
// para asignar el token
const authLink = setContext((_, { headers }) => {
  // Leer el local storage para enviar el token en el header
  const token = localStorage.getItem("token");
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
