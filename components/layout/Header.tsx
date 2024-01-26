import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_USER } from "@/app/config/queries";

const Header = () => {
  const router = useRouter();
  const { data, loading, client } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading && !data?.getUser) {
      router.push("/login");
    }
  }, [loading, data, router]);

  if (loading) return null;

  const { name, email } = data?.getUser || {};

  const logOut = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p>Hi: {name}</p>
      <button
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        type="button"
        onClick={() => logOut()}
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
