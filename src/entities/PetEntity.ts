import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../enum/EnumSpecies";
import EnumPetSex from "../enum/EnumPetSex";
import Pet from "../domain/Pet/Pet";

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
   adopted: boolean;

   constructor(
      id: string,
      name: string,
      species: EnumSpecies,
      birthDate: Date,
      sex: EnumPetSex,
      adopted: boolean
   ) {
      this.id = id;
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.adopted = adopted;
   }

   toClass(): Pet {
      return new Pet(
         this.id,
         this.name,
         this.species,
         this.birthDate,
         this.sex,
         this.adopted
      );
   }
}