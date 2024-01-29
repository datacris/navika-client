"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { GET_USER } from "@/src/config/queries";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { setUser, removeUser } from "@/src/redux/features/user-slice";
import type { User } from "@/src/redux/features/user-slice";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import type { Menu } from "@/src/redux/features/menu-slice";

const Header = ({ isSidebarOpen, toggleSidebar, sidebarWidth }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { menu } = useSelector((state: RootState) => state.MenuItems);
  const userState = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, client, refetch } = useQuery(GET_USER);

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  useEffect(() => {
    // If the user is not logued in, it will be redirected to the login page
    // if (!loading && !data?.getUser) {
    //   router.push("/login");
    // }
    if (data?.getUser?.name) {
      const newLoguedUser: User = {
        id: data.getUser.id,
        name: data.getUser.name,
        email: data.getUser.email,
        isUserLogued: true,
      };
      if (!userState.isUserLogued) {
        dispatch(setUser(newLoguedUser));
      }
    }
  }, [loading, data, router, userState, dispatch]);

  if (loading) return null;

  const getPathname = () => {
    const currentMenuItem = menu.find((item: Menu) =>
      item.paths.includes(pathname)
    );
    return currentMenuItem.title;
  };

  const logOut = () => {
    const handleLogOut = () => {
      localStorage.removeItem("token");
      dispatch(removeUser());
      setTimeout(() => {
        dispatch(removeUser());
      }, 2000);

      client.clearStore();
      router.push("/login");
    };
    return (
      <button
        className="bg-blue-800 hover:bg-blue-900 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        type="button"
        onClick={() => handleLogOut()}
      >
        Log Out
      </button>
    );
  };

  const LogIn = () => {
    return (
      <>
        <button
          className="bg-blue-500 w-full sm:w-auto font-bold text-xs rounded py-1 px-2 text-white shadow-md mr-2 hover:bg-blue-600"
          type="button"
          onClick={() => router.push("/login")}
        >
          Sign In
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-400 w-full sm:w-auto font-bold text-xs rounded py-1 px-2 text-white shadow-md"
          type="button"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </button>
      </>
    );
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: sidebarWidth,
      width: `calc(100% - ${sidebarWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <AppBar position="absolute" open={isSidebarOpen}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleSidebar()}
            sx={{
              marginRight: "36px",
              ...(isSidebarOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {getPathname()}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserCircleIcon className="h-7 w-7 text-blue-800" />
          <p className="mr-5 text-md text-light">
            {userState.isUserLogued ? userState.name : "Guest"}
          </p>
          {userState.isUserLogued ? logOut() : LogIn()}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
