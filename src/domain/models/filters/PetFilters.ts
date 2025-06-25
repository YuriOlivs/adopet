import PetSex from "../../../enum/PetSex";
import Size from "../../../enum/Size";
import Species from "../../../enum/Species";

export interface PetFilters {
   query?: string;
   species?: Species;
   size?: Size;
   sex?: PetSex;
}