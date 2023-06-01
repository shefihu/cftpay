import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";
import { createUploadLink } from "apollo-upload-client";

const httpLink = new HttpLink({
  uri: "https://admin.cftchurchesdevenvironment.xyz/graphql/",
});
const uploadLink = createUploadLink({
  uri: "https://app.cftchurchesdevenvironment.xyz/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from url.

  const search = window.location.search;
  const token = new URLSearchParams(search).get("access-token");
  console.log(token);
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : "",
      "keep-alive": "true",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link: authLink.concat(uploadLink),
});
