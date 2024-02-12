"use client";
import React from "react";
import Layout from "./Layout";
import { ApolloProvider } from "@apollo/client";
import client from "@/src/config/apollo";
import ReduxProvider from "@/src/redux/provider";

const MainContainer = ({ appContent }: any) => {
  return (
    <>
      <ApolloProvider client={client}>
        <ReduxProvider>
          <Layout appContent={appContent} />
        </ReduxProvider>
      </ApolloProvider>
    </>
  );
};

export default MainContainer;
