import React from "react";
import taskModel from "@/model/taskModel";
import Status from "@/components/status";
import { Trash, X } from "lucide-react";

interface ModalTaskProps {
   task: taskModel;
   deleteTask: () => void;
   taskId: string;
   status: boolean;
   onStatusChange: (newStatus: boolean) => void;
   closeModal: () => void;
}

const ModalTask = (props: ModalTaskProps) => {
   return (
      <>
         <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={props.closeModal}
         />
         <div
            className="absolute bg-gray-800 top-1/2 left-1/2 w-[40vw] h-[70vh] -translate-x-1/2 -translate-y-1/2
                    rounded-xl p-8 flex flex-col justify-between z-50"
         >
            <div className="flex flex-col gap-8">
               <div className="bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-white opacity-85 relative top-[-25px]">
                     Titulo
                  </p>
                  <h1 className="text-2xl font-bold text-white">
                     {props.task.titulo}
                  </h1>
               </div>
               <div className="bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-white opacity-85 relative top-[-25px]">
                     Descrição
                  </p>
                  <p className="text-white font-semibold">
                     {props.task.descricao}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-4 justify-between">
               <Status
                  taskId={props.taskId}
                  status={props.status}
                  onStatusChange={props.onStatusChange}
                  textSize="text-base"
               />
               <button
                  onClick={props.deleteTask}
                  className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white"
               >
                  <Trash className="text-white w-5 h-5" />
               </button>
            </div>
         </div>
      </>
   );
};

export default ModalTask;
