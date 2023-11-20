import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const verifyUserPermission = (req: Request, res:Response, next: NextFunction): void =>{
  const userId =req.params.id
  const{sub} = res.locals.decoded

  if(userId !== sub){
    throw new AppError("Insufficient permition", 403)
  }
  return next()
}

export {verifyUserPermission}