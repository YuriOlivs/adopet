import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AdopterEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column({ nullable: true })
   photo?: string | null;

   @Column({ nullable: true })
   address?: string | null;

   constructor(
      id: string,
      name: string,
      email: string,
      password: string,
      address?: string,
      photo?: string,
   ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.address = address || null;
      this.photo = photo || null;
      this.password = password;
   }
}