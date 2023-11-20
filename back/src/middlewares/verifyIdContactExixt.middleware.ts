import { NextFunction, Request, Response } from "express";
import Contact from "../entities/contacts.entity";
import { contactRepository } from "../repositories";
import AppError from "../error";

const verifyIdContactExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {id} = req.params
  const foundContact: Contact | null = await contactRepository.findOneBy({
    id: Number(id),
  });
  if (!foundContact) {
    throw new AppError("Contact not found", 404);
  }
  res.locals = { ...res.locals, foundContact }
  return next();
};

export {verifyIdContactExist}