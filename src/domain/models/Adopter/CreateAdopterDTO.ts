import { CreateAddressDTO } from "../Address/CreateAddressDTO";

export type CreateAdopterDTO = {
   name: string;
   email: string;
   password: string;
   address?: CreateAddressDTO;
   photo?: string;
}