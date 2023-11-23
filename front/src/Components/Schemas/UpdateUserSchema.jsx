import { z } from "zod";

export const UpdateUserSchema = z
  .object({
    fullName: z
      .string()
      .optional(),
    // email: z
    //   .string()
    //   .optional(),
    password: z
      .string()
      .optional(),
    phone: z
      .string()
      .optional(),
    
  })