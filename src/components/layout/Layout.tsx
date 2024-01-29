"use client";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import NotAllowed from "./NotAllowed";

const Layout = ({ appContent }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const sidebarWidth: number = 240;

  const pathname = usePathname();
  const { isUserLogued } = useSelector((state: RootState) => state.User);
  const { menu } = useSelector((state: RootState) => state.MenuItems);

  const currentMenuItem = menu.find((item: any) =>
    item.paths.includes(pathname)
  );
  const allowAccess = currentMenuItem?.isAuthRequired ? isUserLogued : true;

  return (
    <div>
      <ToastContainer />
      {pathname === "/login" || pathname === "/sign-up" ? (
        <div>{appContent}</div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Header
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              sidebarWidth={sidebarWidth}
            />
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              sidebarWidth={sidebarWidth}
            />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              {allowAccess ? appContent : <NotAllowed />}
              <Footer />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
