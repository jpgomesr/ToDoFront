"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingPage from "@/components/loadingPage";
import CreateTask from "@/components/buttonCreateTask";
import Task from "@/components/task";
import taskModel from "@/model/taskModel";
import Header from "@/components/header";
import Profile from "@/components/profile";

export default function Home() {
   const router = useRouter();
   const [userId, setUserId] = useState<string | null>(null);
   const [isClient, setIsClient] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [tasks, setTasks] = useState<taskModel[]>([]);
   const [search, setSearch] = useState("");
   const [isProfileVisible, setIsProfileVisible] = useState(false);

   useEffect(() => {
      setIsClient(true);
      const userIdFromCookie = Cookies.get("user_id");

      if (!userIdFromCookie) {
         router.push("/login");
         return;
      }

      setUserId(userIdFromCookie);
      fetchUser(userIdFromCookie);
   }, []);

   const fetchUser = async (userIdFromCookie: string) => {
      try {
         const response = await fetch(
            `http://localhost:8086/user/${userIdFromCookie}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (!response.ok) {
            setUserId(null);
            router.push("/login");
            return;
         }

         setIsLoading(false);
      } catch (error) {
         console.error(error);
         router.push("/login");
      }
   };

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
      if (userId) {
         fetchTasks();
      }
   }, [userId]);

   const handleSearch = (e: any) => {
      setSearch(e.target.value);
   };

   const handleProfileVisible = () => {
      setIsProfileVisible(!isProfileVisible);
   }

   const filteredTasks = tasks.filter((task) => {
      return (
         task.titulo.toLowerCase().includes(search) ||
         task.descricao.toLowerCase().includes(search)
      );
   });

   if (!isClient || isLoading || !userId) {
      return <LoadingPage />;
   }

   return (
      <div className="min-h-screen bg-gray-900">
         <Header setSearch={handleSearch} search={search} profile={handleProfileVisible} />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-8">
            {filteredTasks.map((task) => (
               <Task key={task.id} task={task} onTaskDeleted={fetchTasks} />
            ))}
         </div>
         <CreateTask onTaskCreated={fetchTasks} />
         {isProfileVisible && <Profile changeVisibility={handleProfileVisible} />}
      </div>
   );
}
