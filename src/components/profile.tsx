"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProfileProps {
   changeVisibility: () => void;
}

const page = (props: ProfileProps) => {
   const [user, setUser] = useState({});

   const router = useRouter();

   useEffect(() => {
      const userIdFromCookie = Cookies.get("user_id");

      if (!userIdFromCookie) {
         router.push("/login");
         return;
      }

      fetchUser(userIdFromCookie);
   }, []);

   const fetchUser = async (userIdFromCookie: string) => {
      const response = await fetch(
         `http://localhost:8086/user/${userIdFromCookie}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      const userData = await response.json();
      setUser(userData);
   };

   return (
      <>
         <div
            className="fixed inset-0 bg-black/50"
            onClick={props.changeVisibility}
         />
         <div className="w-[30vw] h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-xl border border-gray-700 z-50">
            <form action="edit" className="p-8 flex flex-col">
               <div className="flex flex-col">
                  <label htmlFor="nome" className="text-white opacity-80">
                     Nome
                  </label>
                  <input
                     type="text"
                     className="text-white bg-gray-500 px-2 py-1 focus:outline-none rounded-md"
                     value={user?.nome || ""}
                     onChange={(e) =>
                        setUser({ ...user, nome: e.target.value })
                     }
                  />
               </div>
               <div className="flex flex-col">
                  <label htmlFor="email" className="text-white opacity-80">
                     Email
                  </label>
                  <input
                     type="text"
                     className="text-white bg-gray-500 px-2 py-1 focus:outline-none rounded-md"
                     value={user?.email || ""}
                     onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                     }
                  />
               </div>
               <div className="flex flex-col">
                  <label htmlFor="password" className="text-white opacity-80">
                     Senha
                  </label>
                  <input
                     type="password"
                     className="text-white bg-gray-500 px-2 py-1 focus:outline-none rounded-md"
                  />
               </div>
            </form>
         </div>
      </>
   );
};

export default page;
