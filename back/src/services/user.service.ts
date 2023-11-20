import User from "../entities/users.entity";
import AppError from "../error";
import { UserCreate, UserRead, UserReturn, UserUpdate } from "../interfaces/user.interface";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";

const userCreateService =async (payload:UserCreate): Promise<UserReturn> => {
  const user: User = userRepository.create(payload)
  await userRepository.save(user)
  return userReturnSchema.parse(user)
  
}

const userReadService =  async():Promise<UserRead> =>{
  return userReadSchema.parse(await userRepository.find())
}

const userPartialUpdateService = async(user:User, payload: UserUpdate): Promise<UserReturn> =>{
  const newUser: User = userRepository.create({...user, ...payload})
  await userRepository.save(newUser)
  return userReturnSchema.parse(newUser)
}


const userDeleteService =  async(user:User):Promise<void> =>{
  await userRepository.remove(user)
}

export {userCreateService, userReadService, userDeleteService, userPartialUpdateService}