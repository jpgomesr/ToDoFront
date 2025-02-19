"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function RegisterPage() {
   const router = useRouter();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");

   const handleRegister = async (e: Event) => {
      e.preventDefault();

      if (password !== confirmPassword || password.trim() === "") {
         setError("As senhas não coincidem ou estão vazias.");
         return;
      }

      try {
         console.log("Fazendo requisição para o backend...");
         const response = await fetch("http://localhost:8086/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: name, email, senha: password }),
         });

         console.log("Resposta recebida:", response);

         if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na resposta:", errorData);
            setError("Erro ao fazer registro. Verifique suas credenciais.");
            throw new Error("Credenciais inválidas");
         }

         const data = await response.json();
         console.log("Dados recebidos:", data);

         const userId = data.id;

         if (userId) {
            Cookies.set("user_id", userId);
            router.push("/");
         } else {
            setError("Erro ao obter o ID do usuário.");
         }
      } catch (error) {
         console.error("Erro na requisição:", error);
         setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      }
   };

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
      <div className="flex justify-center items-center h-screen bg-gray-900">
         <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <form className="space-y-4">
               <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
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
               <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               {error && <p className="text-red-500 text-sm">{error}</p>}
               <button
                  id="RegisterButton"
                  type="button"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
               >
                  Registrar
               </button>
               <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full text-blue-400 hover:text-blue-300 transition duration-300"
               >
                  Já possuo conta
               </button>
            </form>
         </div>
      </div>
   );
}
