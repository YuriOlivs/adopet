import * as yup from "yup";
import CreatePetDTO from "../models/Pet/CreatePetDTO";
import Species from "../../enum/Species";
import PetSex from "../../enum/PetSex";
import Size from "../../enum/Size";

export const petSchema: yup.ObjectSchema<
   Omit<CreatePetDTO, "adopted">
> = yup.object({
   name: yup
      .string()
      .required(),
   species: yup
      .mixed<Species>()
      .oneOf(Object.values(Species))
      .required(),
   birthDate: yup
      .date()
      .required(),
   sex: yup
      .mixed<PetSex>()
      .oneOf(Object.values(PetSex))
      .required(),
   size: yup
      .mixed<Size>()
      .oneOf(Object.values(Size))
      .required(),
});

export const petListSchema = yup.object().shape({
   pets: yup.array().of(petSchema).required(),
});