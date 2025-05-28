import EnumPetSex from "../../enum/EnumPetSex";
import EnumSize from "../../enum/EnumSize";
import EnumSpecies from "../../enum/EnumSpecies";

export interface PetFilters {
   species?: EnumSpecies;
   size?: EnumSize;
   sex?: EnumPetSex;
}