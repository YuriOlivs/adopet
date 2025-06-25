import Address from "../Address/Address";

export default class ResponseShelterDTO {
  id: string;
  name: string;
  address: Address;
  email: string;
  phone: string;

  constructor(
    id: string,
    name: string,
    address: Address,
    email: string,
    phone: string,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }
}
