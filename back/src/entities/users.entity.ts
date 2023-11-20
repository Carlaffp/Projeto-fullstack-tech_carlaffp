import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Contact from "./contacts.entity";

@Entity('users')
class User{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type: "varchar", length:125})
  fullName: string;

  @Column({type: "varchar", length: 45})
  email: string;

  @Column({type: "varchar", length:120})
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn({type: "date"})
  createdAt: string;

  @OneToMany(()=> Contact, (contact)=> contact.user)
  contacts: Array<Contact>

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    const hashRounds: number = getRounds(this.password);
    if(!hashRounds){
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User