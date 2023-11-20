import { Response, Request, NextFunction } from "express";
import User from "../entities/users.entity";
import { userRepository } from "../repositories";
import AppError from "../error";


 const verifyEmailExist = async (
  req: Request, 
  res: Response,
   next: NextFunction): Promise<void> => {
  if(!req.body.email) return next();

  const foundUserEmail: User | null = await userRepository.findOneBy({email: req.body.email})
  if (foundUserEmail){
    throw new AppError("Email already exists", 409)
  }
  return next()
 }

 export {verifyEmailExist}