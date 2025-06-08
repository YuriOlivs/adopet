import * as yup from "yup";
import { addressSchema } from "./addressSchema";
import CreateAdopterDTO from "../models/Adopter/CreateAdopterDTO";

export const adopterSchema: yup.ObjectSchema<CreateAdopterDTO> = yup.object({
   name: yup
      .string()
      .defined()
      .required()
      .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Name must contain only letters"),
   email: yup
      .string()
      .email()
      .defined()
      .required()
      .matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim),
   password: yup
      .string()
      .defined()
      .required()
      .min(8),
   photo: yup
      .string()
      .optional()
      .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Invalid phone number")
      .nullable(),
   address: addressSchema
      .optional()
      .nullable()
      .required()
});