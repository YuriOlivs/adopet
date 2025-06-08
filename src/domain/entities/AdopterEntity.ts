import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AddressEntity from "./AddressEntity";
import PetEntity from "./PetEntity";
import { cryptPassword } from "../../utils/cryptPassword";
@Entity()
export default class AdopterEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column()
   name: string;

   @Column({ unique: true })
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

   @OneToMany(() => PetEntity, (pet) => pet.adopter)
   pets!: Array<PetEntity>;

   constructor(
      name: string,
      email: string,
      password: string,
      photo?: string,
      address?: AddressEntity,
      pets?: Array<PetEntity>,
      id?: string,
   ) {
      if(id) this.id = id;
      if(pets) this.pets = pets;
      this.name = name;
      this.email = email;
      this.address = address;
      this.photo = photo;
      this.password = password;
   }

   @BeforeInsert()
   @BeforeUpdate()
   protected async createCryptPassword() {
      this.password = cryptPassword(this.password);
   }
}