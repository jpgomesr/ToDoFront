"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingPage from "@/components/loadingPage";
import { Plus, Search, User } from "lucide-react";
import CreateTask from "@/components/buttonCreateTask";

export default function Home() {
   const router = useRouter();
   const [userId, setUserId] = useState<string | null>(null);
   const [isClient, setIsClient] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsClient(true);
      const userIdFromCookie = Cookies.get("user_id");
      setUserId(userIdFromCookie || null);

      setTimeout(() => {
         if (!userIdFromCookie) {
            router.push("/login");
         }
         setIsLoading(false);
      }, 700);
   }, [router]);

   const handleExit = () => {
      Cookies.remove("user_id");
      router.push("/login");
   };

   if (!isClient || isLoading || !userId) {
      return <LoadingPage />;
   }

   return (
      <>
         <header className="py-4 px-16 flex flex-row justify-between items-center bg-gradient-to-r from-blue-400 to-green-500">
            <div>
               <p className="text-2xl font-bold">To Do List</p>
            </div>
            <div className="flex flex-row gap-4 bg-white py-2 px-4 items-center rounded-lg">
               <Search />
               <input
                  type="text"
                  className="h-7 w-80 px-2 focus:outline-none text-lg"
                  placeholder="Digite sua pesquisa aqui"
               />
            </div>
            <div>
               <User className="w-12 h-12" />
            </div>
         </header>
         <CreateTask />
      </>
   );
}
