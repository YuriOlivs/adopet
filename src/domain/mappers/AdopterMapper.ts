import AddressEntity from "../entities/AddressEntity";
import AdopterEntity from "../entities/AdopterEntity";
import Address from "../models/Address/Address";
import Adopter from "../models/Adopter/Adopter";
import CreateAdopterDTO from "../models/Adopter/CreateAdopterDTO";

export default class AdopterMapper {
  static toEntity(adopter: Adopter | CreateAdopterDTO): AdopterEntity {
    let address: AddressEntity | undefined;
    const id = adopter instanceof Adopter ? adopter.id : undefined;
    if (adopter.address) {
      address = new AddressEntity(adopter.address.state, adopter.address.city);
    }

    return new AdopterEntity(
      adopter.name,
      adopter.email,
      adopter.password,
      adopter.photo,
      address,
      id
    );
  }

  static toModel(adopter: AdopterEntity): Adopter {
   let address: Address | undefined;
    if (adopter.address) {
      address = new Address(adopter.address.id, adopter.address.state, adopter.address.city);
    }
    
    return new Adopter(
      adopter.id,
      adopter.name,
      adopter.email,
      adopter.password,
      adopter.photo,
      address
    );
  }
}
