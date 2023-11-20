import { type } from "os";
import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas/user.schema";
import { DeepPartial, Repository } from "typeorm";
import User from "../entities/users.entity";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = DeepPartial<User>;
type UserReturn = z.infer<typeof userReturnSchema>;

type UserRepo = Repository<User>;

export { UserCreate, UserRead, UserRepo, UserUpdate, UserReturn };
