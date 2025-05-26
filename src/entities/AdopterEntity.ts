import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Adopter from "../domain/Adopter/Adopter";

@Entity()
export default class AdopterEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   address: string;

   @Column({ nullable: true })
   photo: string;

   @Column({ nullable: true })
   password: string;

   constructor(
      id: string,
      name: string,
      email: string,
      address: string,
      photo: string,
      password: string
   ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.address = address;
      this.photo = photo;
      this.password = password;
   }

   toClass(): Adopter {
      return new Adopter(
         this.id,
         this.name,
         this.password,
         this.email,
         this.photo,
         this.address
      );
   }
}