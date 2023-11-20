import {z} from "zod";
import { userReturnSchema, userSchema } from "./user.schema";

const contactSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().max(125),
  email: z.string().max(45).email(),
  phone: z.string(),
  createdAt: z.string(),
  user: userSchema,
});

const contactCreateSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  user:true,
});


const contactUpdateSchema = contactCreateSchema.partial()

const contactReturnSchema = contactSchema.extend({
  user:userReturnSchema
})

export {
  contactSchema,
  contactCreateSchema,
  contactUpdateSchema,
  contactReturnSchema
}