import {z} from "zod";
import { userSchema } from "./user.schema";


const loginSchema = userSchema.pick({email:true, password:true})

export {loginSchema}