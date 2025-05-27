import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../../enum/EnumSpecies";
import EnumPetSex from "../../enum/EnumPetSex";
import Pet from "../models/Pet/Pet";
import EnumSize from "../../enum/EnumSize";

@Entity()
export default class PetEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   name: string;

   @Column()
   species: EnumSpecies;

   @Column()
   birthDate: Date;

   @Column()
   sex: EnumPetSex;

   @Column()
   size: EnumSize;

   @Column()
   adopted: boolean;

   constructor(
      id: string,
      name: string,
      species: EnumSpecies,
      birthDate: Date,
      sex: EnumPetSex,
      size: EnumSize,
      adopted: boolean
   ) {
      this.id = id;
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.size = size;
      this.adopted = adopted;
   }
}