import { Plus, X } from "lucide-react";
import { useState } from "react";
import ModalCreateTask from "./modalCreateTask";

interface CreateProps {
   onTaskCreated: () => void;
}

export default function CreateTask(props: CreateProps) {
   const [isVisibleCreateModal, setIsVisibleCreateModal] = useState(false);

   const handleVisibleCreateModal = () => {
      setIsVisibleCreateModal(!isVisibleCreateModal);
   };

   return (
      <>
         <button
            className="absolute w-14 h-14 bg-blue-300 top-[88vh] flex items-center justify-center left-4 rounded-full"
            onClick={handleVisibleCreateModal}
         >
            {!isVisibleCreateModal ? (
               <Plus className="w-8 h-8" />
            ) : (
               <X className="w-8 h-8" />
            )}
         </button>
         {isVisibleCreateModal && (
            <ModalCreateTask onTaskCreated={props.onTaskCreated} />
         )}
      </>
   );
}
