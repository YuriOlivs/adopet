import EnumPetSex from "../../enum/EnumPetSex";
import EnumSize from "../../enum/EnumSize";
import EnumSpecies from "../../enum/EnumSpecies";

export type CreatePetDTO = {
   id: string;
   name: string;
   species: EnumSpecies;
   birthDate: Date;
   sex: EnumPetSex;
   size: EnumSize;
};