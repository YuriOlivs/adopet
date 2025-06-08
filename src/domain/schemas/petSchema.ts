import * as yup from "yup";
import CreatePetDTO from "../models/Pet/CreatePetDTO";
import EnumSpecies from "../../enum/Species";
import EnumPetSex from "../../enum/PetSex";
import EnumSize from "../../enum/Size";

export const petSchema: yup.ObjectSchema<
   Omit<CreatePetDTO, "adopted">
> = yup.object({
   name: yup
      .string()
      .required(),
   species: yup
      .mixed<EnumSpecies>()
      .oneOf(Object.values(EnumSpecies))
      .required(),
   birthDate: yup
      .date()
      .required(),
   sex: yup
      .mixed<EnumPetSex>()
      .oneOf(Object.values(EnumPetSex))
      .required(),
   size: yup
      .mixed<EnumSize>()
      .oneOf(Object.values(EnumSize))
      .required(),
});

export const petListSchema = yup.object().shape({
   pets: yup.array().of(petSchema).required(),
});