
import { AppDataSource } from "./data-source";
import User from "./entities/users.entity";
import Contact from "./entities/contacts.entity";
import { UserRepo } from "./interfaces/user.interface";
import { ContactRepo } from "./interfaces/contact.interface";

const userRepository: UserRepo = AppDataSource.getRepository(User);
const contactRepository: ContactRepo = AppDataSource.getRepository(Contact);

export {userRepository,contactRepository};
