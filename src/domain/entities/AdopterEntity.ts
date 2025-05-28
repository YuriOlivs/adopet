import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AddressEntity from "./AddressEntity";
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
   photo?: string;

   @OneToOne(() => AddressEntity, { 
      nullable: true, 
      cascade: true, 
      eager: true 
   })
   @JoinColumn()
   address?: AddressEntity;

   constructor(
      name: string,
      email: string,
      password: string,
      photo?: string,
      address?: AddressEntity,
      id?: string,
   ) {
      if(id)this.id = id;
      this.name = name;
      this.email = email;
      this.address = address;
      this.photo = photo;
      this.password = password;
   }
}