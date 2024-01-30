"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { Menu } from "@/src/redux/features/menu-slice";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import { Typography } from "@mui/material";

const Sidebar = ({ isSidebarOpen, toggleSidebar, sidebarWidth }: any) => {
  const pathname = usePathname();
  const { isUserLogued } = useSelector((state: RootState) => state.User);
  const { menu } = useSelector((state: RootState) => state.MenuItems);

  const iconPath = (iconName: string) => {
    switch (iconName) {
      case "DashboardIcon": {
        return <DashboardIcon />;
        break;
      }
      case "ScienceOutlinedIcon": {
        return <ScienceOutlinedIcon />;
        break;
      }
      case "ChecklistRtlOutlinedIcon": {
        return <ChecklistRtlOutlinedIcon />;
        break;
      }
      default: {
        return <DashboardIcon />;
        break;
      }
    }
  };

  const buildMenu = (buildParamaters: Menu) => {
    const { title, link, isAuthRequired, paths, icon = "" } = buildParamaters;
    const allowAccess = isAuthRequired ? isUserLogued : true;
    const isPathAvailable = !allowAccess
      ? " cursor-not-allowed text-opacity-40"
      : "";
    const isActivePath = paths.includes(pathname)
      ? " bg-blue-300 hover:bg-blue-200"
      : "";
    const pathClasses = isPathAvailable + " " + isActivePath;

    return (
      <>
        <Link href={link}>
          <ListItemButton className={pathClasses}>
            <ListItemIcon>{iconPath(icon)}</ListItemIcon>
            <ListItemText primary={title} />
            {!allowAccess && (
              <LockClosedIcon className="h-4 w-4 text-gray-700 cursor-not-allowed" />
            )}
          </ListItemButton>
        </Link>
      </>
    );
  };

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: sidebarWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <>
      <Drawer className='max-h-screen sticky top-0'
        variant="permanent"
        open={isSidebarOpen}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography variant="h3">Navika</Typography>

          <IconButton onClick={() => toggleSidebar()}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {menu.map((item: any) => {
            return <div key={item.title}>{buildMenu(item)}</div>;
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
