import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Species from "../../enum/Species";
import PetSex from "../../enum/PetSex";;
import Size from "../../enum/Size";
import AdopterEntity from "./AdopterEntity";

@Entity()
export default class PetEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column()
   name: string;

   @Column()
   species: Species;

   @Column()
   birthDate: Date;

   @Column()
   sex: PetSex;

   @Column()
   size: Size;

   @ManyToOne(() => AdopterEntity, (adotante) => adotante.pets)
   adopter!: AdopterEntity

   constructor(
      name: string,
      species: Species,
      birthDate: Date,
      sex: PetSex,
      size: Size,
      id?: string,
      adopter?: AdopterEntity,
   ) {
      if (id) this.id = id;
      if (adopter) this.adopter = adopter;
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.size = size;
   }
}