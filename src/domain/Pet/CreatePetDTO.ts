import EnumPetSex from "../../enum/EnumPetSex";
import EnumSpecies from "../../enum/EnumSpecies";

export type CreatePetDTO = {
   id: string;
   name: string;
   species: EnumSpecies;
   birthDate: Date;
   sex: EnumPetSex;
};