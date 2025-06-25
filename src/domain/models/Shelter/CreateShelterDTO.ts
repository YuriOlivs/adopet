import { CreateAddressDTO } from "../Address/CreateAddressDTO";

export default class CreateShelterDTO {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: CreateAddressDTO;

  constructor(name: string, password: string, email: string, phone: string, address: CreateAddressDTO) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
