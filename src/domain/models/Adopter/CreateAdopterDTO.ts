import { CreateAddressDTO } from "../Address/CreateAddressDTO";

export default class CreateAdopterDTO {
   name: string;
   email: string;
   password: string;
   photo?: string | null;
   address?: CreateAddressDTO | null;

   constructor(name: string, email: string, password: string, photo?: string | null, address?: CreateAddressDTO | null) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.photo = photo;
      this.address = address;
   }
}