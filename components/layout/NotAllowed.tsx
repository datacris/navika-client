import React from "react";
import { NoSymbolIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const NotAllowed = () => {
  const signIn = () => (
    <Link
      href="/login"
      className="flex text-gray-500 hover:text-gray-900  justify-center"
    >
      here
    </Link>
  );
  const signUp = () => (
    <Link
      href="/sign-up"
      className="flex text-gray-500 hover:text-gray-900 justify-center"
    >
      here
    </Link>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <NoSymbolIcon className="h-20 w-20 text-gray-800" />
      <div className="text-gray-500 text-lg">Access restricted</div>
      <div className="flex text-gray-500 text-lg">
        To access this feature, try log in&nbsp;{signIn()}&nbsp;or create an
        account&nbsp;{signUp()}
      </div>
    </div>
  );
};

export default NotAllowed;
