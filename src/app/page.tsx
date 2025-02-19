"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingPage from "@/components/loadingPage";
import { LogOut, Search, User } from "lucide-react";
import CreateTask from "@/components/buttonCreateTask";
import Task from "@/components/task";
import taskModel from "@/model/taskModel";

export default function Home() {
   const router = useRouter();
   const [userId, setUserId] = useState<string | null>(null);
   const [isClient, setIsClient] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [tasks, setTasks] = useState<taskModel[]>([]);

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

   const fetchTasks = async () => {
      if (!userId) return;

      try {
         const response = await fetch(`http://localhost:8086/task/${userId}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            throw new Error("Erro ao buscar as Tarefas");
         }

         const data = await response.json();
         setTasks(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchTasks();
   }, [userId]);

   const handleExit = () => {
      Cookies.remove("user_id");
      router.push("/login");
   };

   if (!isClient || isLoading || !userId) {
      return <LoadingPage />;
   }

   return (
      <div className="min-h-screen bg-gray-900">
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
               />
            </div>
            <div className="flex gap-10 items-center">
               <button>
                  <User className="w-12 h-12 text-white" />
               </button>
               <button onClick={handleExit}>
                  <LogOut className="w-10 h-10 text-white" />
               </button>
            </div>
         </header>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-8">
            {tasks.map((task) => (
               <Task key={task.id} task={task} onTaskDeleted={fetchTasks} />
            ))}
         </div>
         <CreateTask onTaskCreated={fetchTasks} />
      </div>
   );
}
