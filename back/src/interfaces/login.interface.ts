import { loginSchema } from "../schemas/login.schema";
import {z} from "zod"

type LoginCreate = z.infer<typeof loginSchema>
type LoginReturn = {token: string}

export {LoginCreate, LoginReturn}
