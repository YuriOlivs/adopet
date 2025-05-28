import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../../enum/EnumSpecies";
import EnumPetSex from "../../enum/EnumPetSex";;
import EnumSize from "../../enum/EnumSize";
import AdopterEntity from "./AdopterEntity";

@Entity()
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

   @ManyToOne(() => AdopterEntity, (adotante) => adotante.pets)
   adopter!: AdopterEntity

   constructor(
      name: string,
      species: EnumSpecies,
      birthDate: Date,
      sex: EnumPetSex,
      size: EnumSize,
      id?: string,
      adopter?: AdopterEntity,
   ) {
      if (id) this.id = id;
      if(adopter) this.adopter = adopter;
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.size = size;
   }
}