import EnumPetSex from "../../enum/PetSex";
import EnumSize from "../../enum/Size";
import EnumSpecies from "../../enum/Species";

export interface PetFilters {
   query?: string;
   species?: EnumSpecies;
   size?: EnumSize;
   sex?: EnumPetSex;
}