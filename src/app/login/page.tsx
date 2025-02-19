"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Alert from "@/components/alert";

type AlertType = "success" | "error" | "warning" | "info";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showAlert, setShowAlert] = useState(false);
   const [alertType, setAlertType] = useState<AlertType>("success");
   const [alertMessage, setAlertMessage] = useState("");

   const router = useRouter();

   const handleLogin = async (e: Event) => {
      e.preventDefault();

      if (email.trim() === "" || password.trim() === "") {
         setAlertType("error");
         setAlertMessage("Preencha todos os campos.");
         setShowAlert(true);
         return;
      }

      try {
         const response = await fetch("http://localhost:8086/user/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: email,
               senha: password,
            }),
         });

         if (!response.ok) {
            setAlertType("error");
            setAlertMessage("Erro ao fazer login. Verifique suas credenciais.");
            setShowAlert(true);
            throw new Error("Credenciais inválidas");
         }

         const data = await response.json();
         const userId = data.userId;

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
   };

   useEffect(() => {
      const loginButton = document.getElementById("loginButton");

      if (loginButton) {
         loginButton.addEventListener("click", handleLogin as EventListener);

         return () => {
            loginButton.removeEventListener(
               "click",
               handleLogin as EventListener
            );
         };
      }
   }, [handleLogin]);

   return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
         <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <form className="space-y-4">
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               {showAlert && (
                  <Alert
                     type={alertType}
                     message={alertMessage}
                     onClose={() => setShowAlert(false)}
                  />
               )}
               <button
                  id="loginButton"
                  type="button"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
               >
                  Entrar
               </button>
               <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="w-full text-blue-400 hover:text-blue-300 transition duration-300"
               >
                  Não possuo conta
               </button>
            </form>
         </div>
      </div>
   );
}
