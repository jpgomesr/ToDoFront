interface StatusProps {
   taskId: string;
   status: boolean;
   onStatusChange: (newStatus: boolean) => void;
   textSize: string;
}

export default function Status({
   taskId,
   status,
   onStatusChange,
   textSize,
}: StatusProps) {
   const color = status ? "#8fff87" : "#fffb87";
   const text = status ? "Finalizado" : "Em andamento";

   const toggleStatus = async () => {
      const newStatus = !status;

      try {
         const response = await fetch(`http://localhost:8086/task/${taskId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               status: newStatus,
            }),
         });

         if (!response.ok) {
            throw new Error("Erro ao atualizar o status");
         }

         onStatusChange(newStatus);
      } catch (error) {
         console.error("Erro ao atualizar o status:", error);
      }
   };

   return (
      <button
         className="rounded-lg"
         style={{ backgroundColor: `${color}` }}
         onClick={toggleStatus}
      >
         <p className={`${textSize} px-2 py-1 font-bold`}>{text}</p>
      </button>
   );
}
