"use client";

import { useEffect, useState } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface HomeProps {
   type: AlertType;
   message: string;
   onClose: () => void;
}

export default function Alert(props: HomeProps) {
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setVisible(false);
         props.onClose();
      }, 5000);

      return () => clearTimeout(timer);
   }, [props.onClose]);

   if (!visible) return null;

   const alertStyles = {
      success: "bg-green-100 border-green-400 text-green-700",
      error: "bg-red-100 border-red-400 text-red-700",
      warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
      info: "bg-blue-100 border-blue-400 text-blue-700",
   };

   return (
      <div
         className={`fixed top-4 right-4 border-l-4 p-4 rounded-lg shadow-lg ${
            alertStyles[props.type]
         }`}
      >
         <div className="flex items-center justify-between">
            <span>{props.message}</span>
            <button
               onClick={() => {
                  setVisible(false);
                  props.onClose();
               }}
               className="ml-4 text-lg font-semibold"
            >
               &times;
            </button>
         </div>
      </div>
   );
}
