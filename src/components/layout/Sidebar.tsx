"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { Menu } from "@/src/redux/features/menu-slice";

const Sidebar = () => {
  const pathname = usePathname();
  const { isUserLogued } = useSelector((state: RootState) => state.User);
  const { menu } = useSelector((state: RootState) => state.MenuItems);

  const getStyles = (paths: Array<any>, isAuthRequired: Boolean) => {
    let response = paths.includes(pathname) ? "bg-blue-800 p-3" : "p-2";
    if (isAuthRequired && !isUserLogued)
      response = response.concat(" cursor-not-allowed");
    return response;
  };

  const buildMenu = (buildParamaters: Menu) => {
    const { title, link, isAuthRequired, paths } = buildParamaters;
    const classes = getStyles(paths, isAuthRequired);
    const allowAccess = isAuthRequired ? isUserLogued : true;
    return (
      <li className={classes}>
        <Link href={link}>
          <div className="flex items-center">
            <p
              className={`text-white block ${
                !allowAccess && "cursor-not-allowed text-opacity-40"
              }`}
            >
              {title}
            </p>
            {!allowAccess && (
              <div className=" ml-2">
                <LockClosedIcon className="h-4 w-4 text-gray-100 cursor-not-allowed" />
              </div>
            )}
          </div>
        </Link>
      </li>
    );
  };

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
        {menu.map((item) => {
          return <div key={item.title}>{buildMenu(item)}</div>;
        })}

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
