"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Layout appContent={children} />
        </ApolloProvider>
      </body>
    </html>
  );
}
