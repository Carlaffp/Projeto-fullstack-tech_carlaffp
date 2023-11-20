import { NextFunction, Request, Response } from "express";
import Contact from "../entities/contacts.entity";
import { contactRepository } from "../repositories";
import AppError from "../error";

const verifyUserContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {sub} = res.locals.decoded
  const contactId = req.params.id

  const foundUserContact : Contact | null = await contactRepository.findOne({
    where: {
      user: {id:Number(sub)},
      id:Number(contactId)
    }
  })
  if (!foundUserContact){
    throw new AppError(`Not found contact id ${contactId} for this user`, 409)
  }

  return next();
};

export {
verifyUserContactExists
}