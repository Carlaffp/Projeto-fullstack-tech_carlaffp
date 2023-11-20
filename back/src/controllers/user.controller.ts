import { Request, Response } from "express";
import User from "../entities/users.entity";
import { UserRead, UserReturn } from "../interfaces/user.interface";
import { userCreateService, userDeleteService, userPartialUpdateService, userReadService} from "../services/user.service";

const createUserController = async(req: Request, res: Response): Promise<Response> =>{
  const create: UserReturn = await userCreateService(req.body)
  return res.status(201).json(create)
}

const readUserController =  async(req: Request, res: Response): Promise<Response> =>{
  const user: UserRead =  await userReadService()
  return res.status(200).json(user)
}

const partialUpdateUserController =  async(req: Request, res:Response): Promise<Response> =>{
  const {foundEntity} = res.locals
  const {body} = req 
  const user = await userPartialUpdateService(foundEntity, body)
  return res.status(200).json(user)
}


const deleteUserController =  async(req: Request, res: Response): Promise<Response> =>{
  await userDeleteService(res.locals.foundEntity)
  return res.status(204).json()
}

export { createUserController, readUserController, deleteUserController, partialUpdateUserController}