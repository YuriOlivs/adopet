import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../enum/EnumSpecies";
import EnumPetSex from "../enum/EnumPetSex";

@Entity()
export default class PetEntity {
   @PrimaryGeneratedColumn("uuid")
   id?: string;

   @Column()
   name?: string;

   @Column()
   species?: EnumSpecies;

   @Column()
   birthDate?: Date;

   @Column()
   sex?: EnumPetSex;

   @Column()
   adopted?: boolean;
}