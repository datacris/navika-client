"se client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_USER } from "@/app/config/queries";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const router = useRouter();
  const [isUserLogedIn, setIsUserLoguedIn] = useState(false);
  const { data, loading, client } = useQuery(GET_USER);

  useEffect(() => {
    // If the user is not logued in, it will be redirected to the login page
    // if (!loading && !data?.getUser) {
    //   router.push("/login");
    // }
    if (data?.getUser?.name) {
      setIsUserLoguedIn(true);
    }
  }, [loading, data, router]);

  if (loading) return null;

  const { name, email } = data?.getUser || {};

  const logOut = () => {
    const handleLogOut = () => {
      setIsUserLoguedIn(false);
      localStorage.removeItem("token");
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
        <p className="mr-5 text-md text-light">{isUserLogedIn? name : 'Guest'}</p>
        {isUserLogedIn ? logOut() : LogIn()}
      </div>
    </div>
  );
};

export default Header;
