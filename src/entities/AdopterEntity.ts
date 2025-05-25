import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Adopter {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   address: string;

   @Column()
   photo: string;

   @Column()
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
}