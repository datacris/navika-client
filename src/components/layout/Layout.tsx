"use client";
import React, { useState } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import NotAllowed from "./NotAllowed";
import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";

const Layout = ({ appContent }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const sidebarWidth: number = 220;

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
            <Box component="main">
              <Toolbar />
              <Container className="p-2 mt-0">
                <Grid container spacing={3}>
                  <Grid item xs={12} className=" flex flex-wrap">
                    <Paper
                      className="p-3 mt-1 mx-auto"
                      style={{
                        minWidth: `calc(98vw - ${sidebarWidth}px)`,
                        minHeight: "80vh",
                      }}
                      elevation={3}
                    >
                      <Container className="w-full">
                        {allowAccess ? appContent : <NotAllowed />}
                      </Container>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
