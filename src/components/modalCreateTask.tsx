import { useEffect, useState } from "react";
import Alert from "@/components/alert";
import Cookies from "js-cookie";

type AlertType = "success" | "error" | "warning" | "info";

interface ModalCreateTaskProps {
   onTaskCreated: () => void;
   changeVisibility: () => void;
}

export default function ModalCreateTask(props: ModalCreateTaskProps) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [priority, setPriority] = useState("Baixa");

   const [showAlert, setShowAlert] = useState(false);
   const [alertType, setAlertType] = useState<AlertType>("success");
   const [alertMessage, setAlertMessage] = useState("");

   const handleCreate = (e: any) => {
      e.preventDefault();

      if (!title || !description || !priority) {
         setAlertType("warning");
         setAlertMessage("Por favor, preencha todos os campos.");
         setShowAlert(true);
         return;
      }

      fetch("http://localhost:8086/task", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            titulo: title,
            descricao: description,
            prioridade: priority,
            userId: Cookies.get("user_id"),
         }),
      })
         .then((response) => {
            if (!response.ok) {
               setAlertType("error");
               setAlertMessage("Erro ao criar tarefa.");
               setShowAlert(true);
               return Promise.reject("Falha na criação da tarefa.");
            }
            return response.json();
         })
         .then((data) => {
            setAlertType("success");
            setAlertMessage("Tarefa criada com sucesso!");
            setShowAlert(true);
            props.onTaskCreated();
         })
         .catch((error) => {
            console.error("Erro:", error);
         });
   };

   const handleCreateTaskButton = (e: any) => {
      handleCreate(e);
      props.changeVisibility();
   };

   return (
      <>
         <div
            className="fixed inset-0 bg-black/50"
            onClick={props.changeVisibility}
         />
         <div className="w-[30vw] h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-xl border border-gray-700 z-50">
            <form
               action="createTask"
               className="w-full h-full flex flex-col px-6 py-6 gap-6 justify-between"
            >
               <h3 className="font-bold text-2xl w-full text-center text-white">
                  Criar Tarefa
               </h3>
               <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="px-2 text-lg text-white">
                     Título
                  </label>
                  <input
                     type="text"
                     placeholder="Digite o título"
                     className="px-3 py-2 focus:outline-none rounded-md bg-gray-700 text-white placeholder-gray-400"
                     maxLength={30}
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label
                     htmlFor="description"
                     className="px-2 text-lg text-white"
                  >
                     Descrição
                  </label>
                  <textarea
                     placeholder="Digite a descrição"
                     className="px-3 py-2 focus:outline-none rounded-md w-full h-20 resize-none bg-gray-700 text-white placeholder-gray-400"
                     maxLength={150}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>
               <div className="flex justify-center items-center flex-col gap-2">
                  <label
                     htmlFor="priority"
                     className="w-full text-left px-2 text-lg text-white"
                  >
                     Prioridade
                  </label>
                  <div className="flex flex-wrap rounded-lg bg-gray-700 shadow-md p-1 w-full font-sm gap-2">
                     <label className="flex-1 text-center cursor-pointer">
                        <input
                           type="radio"
                           name="priority"
                           value="Baixa"
                           defaultChecked
                           className="hidden peer"
                           onChange={(e) => setPriority(e.target.value)}
                        />
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-300 transition-all duration-150 ease-in-out peer-checked:bg-gray-600 peer-checked:text-white hover:bg-gray-600">
                           Baixa
                        </span>
                     </label>
                     <label className="flex-1 text-center cursor-pointer">
                        <input
                           type="radio"
                           name="priority"
                           value="Média"
                           className="hidden peer"
                           onChange={(e) => setPriority(e.target.value)}
                        />
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-300 transition-all duration-150 ease-in-out peer-checked:bg-gray-600 peer-checked:text-white hover:bg-gray-600">
                           Média
                        </span>
                     </label>
                     <label className="flex-1 text-center cursor-pointer">
                        <input
                           type="radio"
                           name="priority"
                           value="Alta"
                           className="hidden peer"
                           onChange={(e) => setPriority(e.target.value)}
                        />
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-300 transition-all duration-150 ease-in-out peer-checked:bg-gray-600 peer-checked:text-white hover:bg-gray-600">
                           Alta
                        </span>
                     </label>
                  </div>
               </div>
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-150 ease-in-out"
                     id="createTask"
                     onClick={handleCreateTaskButton}
                  >
                     Criar
                  </button>
               </div>
            </form>
         </div>
         {showAlert && (
            <Alert
               type={alertType}
               message={alertMessage}
               onClose={() => setShowAlert(false)}
            />
         )}
      </>
   );
}
