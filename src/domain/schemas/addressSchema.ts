import * as yup from "yup";
import { CreateAddressDTO } from "../models/Address/CreateAddressDTO";

export const addressSchema: yup.ObjectSchema<CreateAddressDTO> = yup.object({
   state: yup
      .string()
      .required(),
   city: yup
      .string()
      .required(),
});