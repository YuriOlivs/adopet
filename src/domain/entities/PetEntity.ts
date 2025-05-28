import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../../enum/EnumSpecies";
import EnumPetSex from "../../enum/EnumPetSex";;
import EnumSize from "../../enum/EnumSize";

@Entity("pet")
export default class PetEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

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
      name: string,
      species: EnumSpecies,
      birthDate: Date,
      sex: EnumPetSex,
      size: EnumSize,
      adopted: boolean,
      id?: string
   ) {
      if (id) this.id = id;
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.size = size;
      this.adopted = adopted;
   }
}