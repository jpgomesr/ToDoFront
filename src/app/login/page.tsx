"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

interface UsuarioSchema {
   email: string;
   senha: string;
}

export default function Login() {
   const [showAlert, setShowAlert] = useState(false);
   const [alertType, setAlertType] = useState<
      "success" | "error" | "warning" | "info"
   >("success");
   const [alertMessage, setAlertMessage] = useState("");
   const router = useRouter();

   // Inicia o react-hook-form
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<UsuarioSchema>();

   // Função de login
   const handleLogin = async (data: UsuarioSchema) => {
      console.log("Formulário enviado com os seguintes dados:", data); // Adicionei o log para depuração

      try {
         const response = await fetch("http://localhost:8086/user/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: data.email,
               senha: data.senha,
            }),
         });

         if (!response.ok) {
            setAlertType("error");
            setAlertMessage("Erro ao fazer login. Verifique suas credenciais.");
            setShowAlert(true);
            throw new Error("Credenciais inválidas");
         }

         const dataResponse = await response.json();
         const userId = dataResponse.userId;

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

   return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
         <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
               <div>
                  <input
                     type="email"
                     placeholder="Email"
                     {...register("email", { required: "Email é obrigatório" })}
                     className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                     <p className="text-red-500 text-sm">
                        {errors.email.message}
                     </p>
                  )}
               </div>
               <div>
                  <input
                     type="password"
                     placeholder="Senha"
                     {...register("senha", { required: "Senha é obrigatória" })}
                     className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.senha && (
                     <p className="text-red-500 text-sm">
                        {errors.senha.message}
                     </p>
                  )}
               </div>
               {showAlert && (
                  <div className={`alert ${alertType}`}>{alertMessage}</div>
               )}
               <button
                  type="submit"
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
