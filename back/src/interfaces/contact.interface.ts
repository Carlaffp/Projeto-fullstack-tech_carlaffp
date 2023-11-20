import {z } from "zod";
import { contactCreateSchema, contactReturnSchema, contactUpdateSchema } from "../schemas/contact.schema";
import { DeepPartial, Repository } from "typeorm";
import Contact from "../entities/contacts.entity";

type ContactCreat = z.infer<typeof contactCreateSchema>;

type ContactUpdate = DeepPartial<Contact>
type ContactReturn = z.infer<typeof contactReturnSchema>

type ContactRepo = Repository<Contact>

export {
  ContactCreat, ContactUpdate, ContactRepo, ContactReturn
}