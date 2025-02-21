import React from "react";
import { Search, User, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface HeaderProps {
   setSearch?: () => void;
   search?: string;
}

const header = (props: HeaderProps) => {
   const router = useRouter();

   const handleExit = () => {
      Cookies.remove("user_id");
      router.push("/login");
   };

   return (
      <header className="py-4 px-16 flex flex-row justify-between items-center bg-gray-800">
         <div>
            <p className="text-2xl font-bold text-white">To Do List</p>
         </div>
         <div className="flex flex-row gap-4 bg-gray-700 py-2 px-4 items-center rounded-lg">
            <Search className="text-gray-400" />
            <input
               type="text"
               className="h-7 w-80 px-2 focus:outline-none text-lg bg-transparent text-white placeholder-gray-400"
               placeholder="Digite sua pesquisa aqui"
               value={props.search}
               onChange={props.setSearch}
            />
         </div>
         <div className="flex gap-10 items-center">
            <button>
               <User className="w-8 h-8 text-white" />
            </button>
            <button onClick={handleExit}>
               <LogOut className="w-8 h-8 text-white" />
            </button>
         </div>
      </header>
   );
};

export default header;
