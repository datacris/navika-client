"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

const Layout = ({ appContent }: any) => {
  const pathname = usePathname();
  return (
    <div>
      <ToastContainer />
      {pathname === "/login" || pathname === "/sign-up" ? (
        <div>{appContent}</div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {appContent}
              <Footer />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
