import { useEffect, useState } from "react";
import Alert from "@/components/alert";
import Cookies from "js-cookie";

type AlertType = "success" | "error" | "warning" | "info";

interface ModalCreateTaskProps {
   onTaskCreated: () => void;
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

   return (
      <>
         <div className="w-[30vw] h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-green-500 rounded-xl">
            <form
               action="createTask"
               className="w-full h-full flex flex-col px-6 py-6 gap-6 justify-between"
            >
               <h3 className="font-bold text-2xl w-full text-center">
                  Criar Tarefa
               </h3>
               <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="px-2 text-lg">
                     Titulo
                  </label>
                  <input
                     type="text"
                     placeholder="Digite o titulo"
                     className="px-3 py-1 focus:outline-none rounded-md"
                     maxLength={30}
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="px-2 text-lg">
                     Descrição
                  </label>
                  <textarea
                     placeholder="Digite a descrição"
                     className="px-3 py-1 focus:outline-none rounded-md w-full h-20 resize-none"
                     maxLength={150}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>
               <div className="flex justify-center items-center flex-col gap-2">
                  <label
                     htmlFor="priority"
                     className="w-full text-left px-2 text-lg"
                  >
                     Prioridade
                  </label>
                  <div className="flex flex-wrap rounded-lg bg-gray-200 shadow-md p-1 w-full font-sm gap-2">
                     <label className="flex-1 text-center cursor-pointer">
                        <input
                           type="radio"
                           name="priority"
                           value="Baixa"
                           defaultChecked
                           className="hidden peer"
                           onChange={(e) => setPriority(e.target.value)}
                        />
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-700 transition-all duration-150 ease-in-out peer-checked:bg-white peer-checked:font-semibold hover:bg-gray-300">
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
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-700 transition-all duration-150 ease-in-out peer-checked:bg-white peer-checked:font-semibold hover:bg-gray-300">
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
                        <span className="flex items-center justify-center py-2 px-4 rounded-md text-gray-700 transition-all duration-150 ease-in-out peer-checked:bg-white peer-checked:font-semibold hover:bg-gray-300">
                           Alta
                        </span>
                     </label>
                  </div>
               </div>
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="bg-white px-4 py-2 rounded-lg hover:bg-green-200 transition-all duration-150 ease-in-out"
                     id="createTask"
                     onClick={handleCreate}
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
