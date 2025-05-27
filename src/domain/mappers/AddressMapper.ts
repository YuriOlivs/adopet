import Address from "../models/Address/Address";
import { CreateAddressDTO } from "../models/Address/CreateAddressDTO";
import AddressEntity from "../entities/AddressEntity";

export default class AddressMapper {
   static toModel(address: AddressEntity): Address {
      return new Address(address.id, address.state, address.city);
   }

   static toEntity(address: Address): AddressEntity {
      return new AddressEntity(address.id,address.state, address.city);
   }

   static toDTO(address: Address | AddressEntity): CreateAddressDTO {
      return { state: address.state, city: address.city };
   }
}