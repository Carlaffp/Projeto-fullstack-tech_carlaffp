import { z } from "zod";

const userSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().max(125),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  phone: z.string(),
  createdAt: z.string(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
});

const userUpdateSchema = userCreateSchema.partial();

const userReturnSchema = userSchema.omit({
  password: true,
});

const userReadSchema = userReturnSchema.array();


export {
  userSchema,
  userCreateSchema,
  userReadSchema,
  userUpdateSchema,
  userReturnSchema,
};
