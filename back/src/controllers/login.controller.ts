import { Request, Response } from "express";
import { LoginReturn } from "../interfaces/login.interface";
import { LoginCreateService } from "../services/login.service";

const createLoginController = async(req: Request, res:Response): Promise<Response> =>{
  const token:LoginReturn = await LoginCreateService(req.body)
  return res.status(200).json(token)
}

export {createLoginController}