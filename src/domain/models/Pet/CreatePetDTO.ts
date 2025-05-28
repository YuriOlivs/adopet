import EnumPetSex from "../../../enum/EnumPetSex";
import EnumSize from "../../../enum/EnumSize";
import EnumSpecies from "../../../enum/EnumSpecies";

export default class CreatePetDTO {
   name: string;
   species: EnumSpecies;
   birthDate: Date;
   sex: EnumPetSex;
   size: EnumSize;
   adopted: boolean;

   constructor(name: string, species: EnumSpecies, birthDate: Date, sex: EnumPetSex, size: EnumSize) {
      this.name = name;
      this.species = species;
      this.birthDate = birthDate;
      this.sex = sex;
      this.size = size;
      this.adopted = false;
   }
}