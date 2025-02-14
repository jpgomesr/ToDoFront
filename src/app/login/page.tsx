"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Alert from "@/components/alert";

type AlertType = "success" | "error" | "warning" | "info";

export default function login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter();

   const [showAlert, setShowAlert] = useState(false);
   const [alertType, setAlertType] = useState<AlertType>("success");
   const [alertMessage, setAlertMessage] = useState("");

   useEffect(() => {
      const loginButton = document.getElementById("loginButton");

      const handleLogin = (e: any) => {
         e.preventDefault();

         fetch("http://localhost:8086/user/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: email,
               senha: password,
            }),
         })
            .then((response) => {
               if (!response.ok) {
                  setAlertType("error");
                  setAlertMessage(
                     "Erro ao fazer login. Verifique suas credenciais."
                  );
                  setShowAlert(true);
                  throw new Error("Credenciais inválidas");
               }
               return response.json();
            })
            .then((data) => {
               console.log(data);
               const userId = data.userId;
               Cookies.set("user_id", userId);
               router.push("/");
            })
            .catch((error) => {
               console.error("Erro:", error.message);
            });
      };

      if (loginButton) {
         loginButton.addEventListener("click", handleLogin);

         return () => {
            loginButton.removeEventListener("click", handleLogin);
         };
      }
   }, [email, password]);

   return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500">
         <div className="w-[40%] h-[70%] bg-white rounded-lg shadow-2xl flex justify-center items-center">
            <form action="login" className="flex flex-col gap-6 w-3/4">
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">
                     Email
                  </label>
                  <input
                     type="text"
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
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                     id="loginButton"
                  >
                     Entrar
                  </button>
               </div>
               <div className="flex justify-center">
                  <button
                     type="button"
                     onClick={() => router.push("/register")}
                     className="text-blue-500 hover:text-blue-600 transition duration-300"
                  >
                     Não possuo conta
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
