import * as yup from "yup";
import CreateShelterDTO from "../models/Shelter/CreateShelterDTO";
import { addressSchema } from "./addressSchema";

export const shelterSchema: yup.ObjectSchema<CreateShelterDTO> = yup.object({
   name: yup
      .string()
      .defined()
      .required(),
   password: yup
      .string()
      .defined()
      .required()
      .min(8),
   email: yup
      .string()
      .email()
      .defined()
      .required()
      .matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim),
   phone: yup
      .string()
      .defined()
      .required()
      .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Invalid phone number"),
   address: addressSchema
      .optional()
      .nullable()
      .required()
})