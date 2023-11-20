import { Request, Response } from "express";
import User from "../entities/users.entity";
import { contactCreateService, contactDeleteService, contactReadService, contactRetrieveService, contactUpdateService} from "../services/contact.service";

const createContactController = async(req: Request, res: Response): Promise<Response> =>{
  const {sub} = res.locals.decoded
  const contact = await contactCreateService(sub, req.body)
  return res.status(201).json(contact)
}

const readContactController = async(req: Request, res:Response):Promise<Response> =>{
  const {sub} = res.locals.decoded
  const contact = await contactReadService(sub)
  return res.status(201).json(contact)
}

  const retrieveContactController = async(req: Request, res:Response):Promise<Response> =>{
    const contactId: number = Number(req.params.id)
    const contact = await contactRetrieveService(contactId)
    return res.status(201).json(contact)
  }

  const updateContactController = async(req: Request, res:Response):Promise<Response> =>{
    const foundContact = Number(req.params.id)
    const updateContact = await contactUpdateService(foundContact, req.body)
    return res.status(200).json(updateContact)
  }


  const deleteContactController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {sub} = res.locals.decoded
    await contactDeleteService(res.locals.foundContact, sub);
    return res.status(204).json();
  };

export {createContactController, retrieveContactController, readContactController, deleteContactController, updateContactController}