import React from "react";
import z from "zod";

export const LoginValidator = () => {
   return z.object({
      email: z.string(),
      senha: z
         .string()
         .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
         .regex(/[A-Z]/, {
            message: "A senha deve conter pelo menos uma letra maiúscula.",
         })
         .regex(/[a-z]/, {
            message: "A senha deve conter pelo menos uma letra minúscula.",
         })
         .regex(/[0-9]/, {
            message: "A senha deve conter pelo menos um número.",
         })
         .regex(/[^A-Za-z0-9]/, {
            message: "A senha deve conter pelo menos um caractere especial.",
         })
         .refine((senha) => !/(.)\1{2,}/.test(senha), {
            message: "A senha não pode conter sequências repetidas.",
         })
         .refine((senha) => !senha.includes("usuario"), {
            message: "A senha não pode conter o nome de usuário.",
         }),
   });
};
