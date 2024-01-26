"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const classDashboard = ["/", "/home"].includes(pathname)
    ? "bg-blue-800 p-3"
    : "p-2";

  const classExperiments = ["/experiments"].includes(pathname)
    ? "bg-blue-800 p-3"
    : "p-2";
  const classTodoRedux = ["/todo-redux"].includes(pathname)
    ? "bg-blue-800 p-3"
    : "p-2";

  return (
    <aside
      className="bg-gray-700 
    sm:w-1/3 
    md:w-1/6 
    xl:w-1/8
    sm:min-h-screen 
    p-7"
    >
      <div>
        <Link href="/home">
          <p className="text-white text-2xl font-black">NAVIKA APP</p>
        </Link>
      </div>
      <nav className="mt-5 list-none">
        <li className={classDashboard}>
          <Link href="/home">
            <p className="text-white mb-2 block">Home</p>
          </Link>
        </li>
        <li className={classExperiments}>
          <Link href="/experiments">
            <p className="text-white mb-2 block">Experiments</p>
          </Link>
        </li>
        <li className={classTodoRedux}>
          <Link href="/todo-redux">
            <p className="text-white mb-2 block">Todo - Redux</p>
          </Link>
        </li>
        <Link href="/sign-up">
          <h2 className="flex text-gray-500 p-4 text-sm  justify-center">
            Dont have an account? Sign up here
          </h2>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
