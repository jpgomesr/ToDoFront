import taskModel from "@/model/taskModel";
import Status from "@/components/status";
import { Info, Trash, ArrowDown, Equal, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Priority } from "@/model/priority";
import ModalTask from "@/components/modalTask";

interface TaskProps {
   task: taskModel;
   onTaskDeleted: () => void;
}

export default function Task(props: TaskProps) {
   const [taskStatus, setTaskStatus] = useState(props.task.status);
   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleDeleteTask = async () => {
      await fetch(`http://localhost:8086/task/${props.task.id}`, {
         method: "DELETE",
      });

      props.onTaskDeleted();
   };

   const handleStatusChange = (newStatus: boolean) => {
      setTaskStatus(newStatus);
   };

   const handleShowModal = () => {
      setIsModalVisible(!isModalVisible);
   };

   const getPriorityStyles = (priority: Priority) => {
      const normalizedPriority = (priority: string) => {
         switch (priority.toLowerCase()) {
            case "baixa":
               return Priority.Baixa;
            case "média":
               return Priority.Média;
            case "alta":
               return Priority.Alta;
            default:
               return Priority.Baixa;
         }
      };

      switch (normalizedPriority(priority.toString())) {
         case Priority.Baixa:
            return {
               color: "text-green-500",
               icon: <ArrowDown className="w-4 h-4" />,
               label: "Prioridade Baixa",
            };
         case Priority.Média:
            return {
               color: "text-yellow-500",
               icon: <Equal className="w-4 h-4" />,
               label: "Prioridade Média",
            };
         case Priority.Alta:
            return {
               color: "text-red-500",
               icon: <ArrowUp className="w-4 h-4" />,
               label: "Prioridade Alta",
            };
         default:
            return {
               color: "text-gray-500",
               icon: null,
               label: "Sem Prioridade",
            };
      }
   };

   const priorityStyles = getPriorityStyles(props.task.prioridade);

   return (
      <div className="flex flex-row justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
         <div className="flex-1 flex gap-2 flex-col">
            <h3 className="text-lg font-semibold text-white mb-1">
               {props.task.titulo}
            </h3>
            <div className="flex items-center gap-2">
               <Status
                  taskId={props.task.id}
                  status={taskStatus}
                  onStatusChange={handleStatusChange}
                  textSize="text-xs"
               />
               <div
                  className={`flex items-center gap-1 ${priorityStyles.color}`}
               >
                  {priorityStyles.icon}
                  <span className="text-xs">{priorityStyles.label}</span>
               </div>
            </div>
         </div>
         <div className="flex gap-2">
            <button
               className="mt-2 bg-blue-400 hover:bg-blue-500 w-8 h-8 flex justify-center items-center rounded-full transition-all duration-200"
               onClick={handleShowModal}
            >
               <Info className="text-black w-5 h-5" />
            </button>
            <button
               onClick={handleDeleteTask}
               className="mt-2 bg-red-500 hover:bg-red-600 w-8 h-8 flex justify-center items-center rounded-full transition-all duration-200"
            >
               <Trash className="text-white w-4 h-4" />
            </button>
         </div>
         {isModalVisible && (
            <ModalTask
               task={props.task}
               deleteTask={handleDeleteTask}
               taskId={props.task.id}
               status={taskStatus}
               onStatusChange={handleStatusChange}
               closeModal={handleShowModal}
            />
         )}
      </div>
   );
}
