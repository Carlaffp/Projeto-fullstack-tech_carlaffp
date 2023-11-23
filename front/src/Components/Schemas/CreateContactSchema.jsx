import { z } from "zod";

export const CreateContactSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("O nome é obrigatório")
      .min(3, "O nome precisa conter pelo menos 3 caracteres"),
    email: z
      .string()
      .email("O e-mail não é válido")
      .nonempty("O email é obrigatório"),
    phone: z
      .string()
      .nonempty("Contato é obrigatório"),
    
  })