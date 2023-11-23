import { compare } from "bcryptjs";
import User from "../entities/users.entity";
import AppError from "../error";
import { LoginCreate, LoginReturn } from "../interfaces/login.interface";
import { userRepository } from "../repositories";
import { sign } from "jsonwebtoken";


const LoginCreateService = async({email, password}: LoginCreate):Promise<LoginReturn> =>{
  
  const user: User | null = await userRepository.findOneBy({email})

  if(!user) throw new AppError("Invalid credentials", 401)
  

  const passwordIsValid: boolean = await compare(password, user.password)

  if(!passwordIsValid) throw new AppError("Invalid credentials",401)
  
  const token: string = sign(
    {email:user.email},
    process.env.SECRET_KEY!,
    {subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN!}
  )

  return {user, token}
}

export {LoginCreateService}