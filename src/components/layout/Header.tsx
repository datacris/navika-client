"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { GET_USER } from "@/src/config/queries";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import {
  setUser,
  removeUser,
  toogleUserProfileForm,
} from "@/src/redux/features/user-slice";
import type { User } from "@/src/redux/features/user-slice";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { Menu } from "@/src/redux/features/menu-slice";
import { Tooltip } from "@mui/material";
import Profile from "../user-profile/Profile";

const Header = ({ isSidebarOpen, toggleSidebar, sidebarWidth }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [isUserSigningOut, setIsUserSigningOut] = useState(false);

  const { menu } = useSelector((state: RootState) => state.MenuItems);
  const userState = useSelector((state: RootState) => state.User);

  const { data, loading, client, refetch } = useQuery(GET_USER);

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  // This use Effect refetch the UserInfo after the locaStorage updates
  useEffect(() => {
    const refetchUser = async () => {
      await refetch();
    };
    refetchUser();
  }, [refetch]);

  useEffect(() => {
    if (isUserSigningOut) {
      localStorage.removeItem("token");
      dispatch(removeUser());
      setTimeout(() => {
        dispatch(removeUser());
      }, 2000);

      client.clearStore();
      router.push("/login");
    }
  }, [client, dispatch, isUserSigningOut, router]);

  useEffect(() => {
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
    return currentMenuItem?.title;
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

  const loadUserNameAndProfile = () => {
    return (
      <>
        <Tooltip arrow title="Profile" placement="bottom">
          <p
            className="mr-5 text-md text-light cursor-pointer"
            onClick={() =>
              userState.isUserLogued && dispatch(toogleUserProfileForm())
            }
          >
            {userState.isUserLogued ? userState.name : "Guest"}
            {userState.isUserLogued &&
              (userState.showShownUserProfileForm ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              ))}
          </p>
        </Tooltip>
        <Profile setIsUserSigningOut={setIsUserSigningOut} />
      </>
    );
  };

  return (
    <>
      <AppBar className="" open={isSidebarOpen}>
        <Toolbar sx={{ pr: "24px" }}>
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
          {loadUserNameAndProfile()}
          {!userState.isUserLogued && LogIn()}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
