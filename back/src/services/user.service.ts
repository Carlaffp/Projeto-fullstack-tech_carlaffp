import User from "../entities/users.entity";
import AppError from "../error";
import bcrypt from 'bcryptjs';
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

const UserRetrieveService = async (userId: string): Promise<User | null> =>{
  return await userRepository.findOneBy({id:parseInt(userId)})
  
}
const userPartialUpdateService = async(user:User, payload: UserUpdate | any): Promise<UserReturn> =>{
  const newData = {...payload}
  for(const key in newData){
    if (newData.hasOwnProperty(key) && newData[key] === '' || newData[key]===null || newData[key] === undefined){
       delete newData[key]
    }
  }
  if(newData.password){
    const hashPassword = await bcrypt.hash(newData.password, 10)
    newData.password = hashPassword
  }
  const newUser = await userRepository.save({...user, ...newData})
  return userReturnSchema.parse(newUser)
}


const userDeleteService =  async(user:User):Promise<void> =>{
  await userRepository.remove(user)
}

export {userCreateService, userReadService, userDeleteService, userPartialUpdateService, UserRetrieveService}