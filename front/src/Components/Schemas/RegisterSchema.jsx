import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("O nome é obrigatório")
      .min(3, "O nome precisa conter pelo menos 3 caracteres"),
    email: z
      .string()
      .email("O e-mail não é válido")
      .nonempty("O email é obrigatório"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(6, "A senha  precisa de no mínimo 6 caracteres")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(/(?=.*?[#?!@$%^&*-])/, "É necessário um caracter especial"),
    confirm: z
      .string()
      .nonempty("Confirmar senha é obrigatório")
      .min(8, "Precisa de no mínimo 6 caracteres"),
    phone: z
      .string()
      .nonempty("Contato é obrigatório"),
    
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "A confirmação e a senha precisam corresponder",
    path: ["confirm"],
  });