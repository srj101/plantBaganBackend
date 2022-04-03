import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
const link = new createHttpLink({
  uri: "https://plantbaganbackend.herokuapp.com/api",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
  withCredentials: true,
});
const client = new ApolloClient({
  link, 
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


