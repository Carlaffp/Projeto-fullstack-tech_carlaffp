import { NextFunction, Request, Response } from "express";
import User from "../entities/users.entity";
import { userRepository } from "../repositories";
import AppError from "../error";

const verifyIdExist = async( req: Request, res: Response, next: NextFunction):Promise<void> =>{
  const foundEntity: User | null = await userRepository.findOneBy({id:Number(req.params.id)})
  if (!foundEntity){
    throw new AppError("User not found", 404)
  }
  res.locals = {...res.locals, foundEntity}
  return next()
}

export {verifyIdExist}