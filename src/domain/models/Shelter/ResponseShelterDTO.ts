import Address from "../Address/Address";
import ResponsePetDTO from "../Pet/ResponsePetDTO";

export default class ResponseShelterDTO {
  id: string;
  name: string;
  address: Address;
  email: string;
  phone: string;
  pets: Array<Omit<ResponsePetDTO, "shelter">>;

  constructor(
    id: string,
    name: string,
    address: Address,
    email: string,
    phone: string,
    pets: Array<Omit<ResponsePetDTO, "shelter">>
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.pets = pets;
  }
}
