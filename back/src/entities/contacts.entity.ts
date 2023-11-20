import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import User from "./users.entity";

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type: "varchar", length:125})
  fullName: string;

  @Column({type: "varchar", length: 45})
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn({type: "date"})
  createdAt: string;

  @ManyToOne(()=> User, (user)=> user.contacts, {onDelete: "CASCADE"})
  user: User;
}

export default Contact