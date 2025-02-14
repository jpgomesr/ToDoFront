"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Alert from "@/components/alert"; // Supondo que você tenha um componente Alert

type AlertType = "success" | "error" | "warning" | "info";

export default function RegisterPage() {
   const router = useRouter();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showAlert, setShowAlert] = useState(false);
   const [alertType, setAlertType] = useState<AlertType>("success");
   const [alertMessage, setAlertMessage] = useState("");

   const handleRegister = useCallback(
      async (e: Event) => {
         e.preventDefault();

         if (password !== confirmPassword || password.trim() === "") {
            setAlertType("error");
            setAlertMessage("As senhas não coincidem ou estão vazias.");
            setShowAlert(true);
            return;
         }

         try {
            const response = await fetch(
               "http://localhost:8086/user/register",
               {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     nome: name,
                     email: email,
                     senha: password,
                  }),
               }
            );

            if (!response.ok) {
               setAlertType("error");
               setAlertMessage(
                  "Erro ao fazer registro. Verifique suas credenciais."
               );
               setShowAlert(true);
               throw new Error("Credenciais inválidas");
            }

            const data = await response.json();
            const userId = data.id;

            if (userId) {
               Cookies.set("user_id", userId);
               router.push("/");
            } else {
               setAlertType("error");
               setAlertMessage("Erro ao obter o ID do usuário.");
               setShowAlert(true);
            }
         } catch (error) {
            console.error("Erro:", error);
         }
      },
      [name, email, password, confirmPassword, router]
   );

   useEffect(() => {
      const registerButton = document.getElementById("RegisterButton");

      if (registerButton) {
         registerButton.addEventListener(
            "click",
            handleRegister as EventListener
         );

         return () => {
            registerButton.removeEventListener(
               "click",
               handleRegister as EventListener
            );
         };
      }
   }, [handleRegister]);

   return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500">
         <div className="w-[40%] h-[90%] bg-white rounded-lg shadow-2xl flex justify-center items-center">
            <form className="flex flex-col gap-6 w-3/4">
               <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-gray-700 font-medium">
                     Nome
                  </label>
                  <input
                     type="text"
                     placeholder="Digite seu nome"
                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">
                     Email
                  </label>
                  <input
                     type="email"
                     placeholder="Digite seu email"
                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label
                     htmlFor="password"
                     className="text-gray-700 font-medium"
                  >
                     Senha
                  </label>
                  <input
                     type="password"
                     placeholder="Digite sua senha"
                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label
                     htmlFor="confirmPassword"
                     className="text-gray-700 font-medium"
                  >
                     Confirmar Senha
                  </label>
                  <input
                     type="password"
                     placeholder="Confirme sua senha"
                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
               </div>
               <div className="flex justify-center">
                  <button
                     id="RegisterButton"
                     type="button"
                     className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                     Registrar
                  </button>
               </div>
               <div className="flex justify-center">
                  <button
                     type="button"
                     onClick={() => router.push("/login")}
                     className="text-blue-500 hover:text-blue-600 transition duration-300"
                  >
                     Já possuo conta
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
      </div>
   );
}
