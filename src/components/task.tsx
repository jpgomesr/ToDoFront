import taskModel from "@/model/taskModel";
import Status from "@/components/status";
import { Trash } from "lucide-react";
import { useState } from "react";

interface TaskProps {
   task: taskModel;
   onTaskDeleted: () => void;
}

export default function Task(props: TaskProps) {
   const [taskStatus, setTaskStatus] = useState(props.task.status);

   const handleDeleteTask = async () => {
      await fetch(`http://localhost:8086/task/${props.task.id}`, {
         method: "DELETE",
      });

      props.onTaskDeleted();
   };

   const handleStatusChange = (newStatus: boolean) => {
      setTaskStatus(newStatus);
   };

   return (
      <div className="flex flex-row w-1/2 justify-between items-center">
         <div className="">
            <p>{props.task.titulo}</p>
            <p>{props.task.descricao}</p>
            <Status
               taskId={props.task.id}
               status={taskStatus}
               onStatusChange={handleStatusChange}
            />
         </div>
         <button
            onClick={handleDeleteTask}
            className="bg-red-500 hover:bg-red-800 w-12 h-12 flex justify-center items-center rounded-full"
         >
            <Trash className="text-white" />
         </button>
      </div>
   );
}
