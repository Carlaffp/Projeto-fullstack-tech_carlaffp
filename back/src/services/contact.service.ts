import Contact from "../entities/contacts.entity";
import User from "../entities/users.entity";
import AppError from "../error";
import { ContactCreat, ContactReturn, ContactUpdate } from "../interfaces/contact.interface";
import { contactRepository, userRepository } from "../repositories";
import { contactSchema, contactReturnSchema} from "../schemas/contact.schema";

  const contactCreateService = async(userId: number, payload:ContactCreat): Promise<ContactReturn> =>{
    const user: User | null = await userRepository.findOneBy({id: userId})
    if(!user) {
      throw new AppError("user not found")
    }

    const foundEmail = await contactRepository.createQueryBuilder("contact")
    .where("contact.userId= :userId", {userId: userId})
    .andWhere("contact.email= :email", {email:payload.email})

    const result = await foundEmail.getMany()
    
    if(result.length != 0){
      throw new AppError("There is already a contact registered with this email.")

    }
    const contact: Contact = contactRepository.create({user, ...payload})
    await contactRepository.save(contact)
    return contactSchema.parse(contact)
  }


  const contactReadService = async(userId: number):Promise<User[]> =>{
    const userAndContacts = await userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contact")
    .where("user.id= :id", {id: userId})
    const result = userAndContacts.getMany()
    return result
   }

 const contactRetrieveService = async(contactId:number):Promise<ContactReturn> =>{
  const contact = await contactRepository.findOne({
    where:{
      id: contactId
    },
    relations: {
      user: true
    }
    
  })
  return contactReturnSchema.parse(contact)

 }

 const contactUpdateService = async(contact: number, payload:ContactUpdate):Promise<Contact> =>{
  const foundContact: Contact | null = await contactRepository.findOneBy({id:contact})
  if (!foundContact) throw new AppError("Contact not found")
  return await contactRepository.save({...foundContact, ...payload})
 }

 const contactDeleteService = async(contact: Contact, userId: number): Promise<void> =>{
  const contactId = contact.id
  const foundContact = await contactRepository.createQueryBuilder()
  .delete()
  .where("userId= :userId", {userId: userId})
  .andWhere("id= :id", {id:contactId})
  .execute()
 }

  export {contactCreateService, contactRetrieveService, contactReadService, contactDeleteService, contactUpdateService}