"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_USER } from "@/src/config/queries";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { setUser, removeUser } from "@/src/redux/features/user-slice";
import type { User } from "@/src/redux/features/user-slice";

const Header = () => {
  const router = useRouter();

  const userState = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, client, refetch } = useQuery(GET_USER);

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

  return (
    <div className="h-8 p-2">
      <div className="flex items-center border-2 border-indigo-50 p-3 absolute w-30 mb-3 right-5 rounded shadow-md bg-gray-200">
        <UserCircleIcon className="h-7 w-7 text-blue-800" />
        <p className="mr-5 text-md text-light">
          {userState.isUserLogued ? userState.name : "Guest"}
        </p>
        {userState.isUserLogued ? logOut() : LogIn()}
      </div>
    </div>
  );
};

export default Header;
