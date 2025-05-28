import AddressEntity from "../entities/AddressEntity";
import AdopterEntity from "../entities/AdopterEntity";
import PetEntity from "../entities/PetEntity";
import Address from "../models/Address/Address";
import Adopter from "../models/Adopter/Adopter";
import CreateAdopterDTO from "../models/Adopter/CreateAdopterDTO";
import ResponseAdopterDTO from "../models/Adopter/ResponseAdopterDTO";
import Pet from "../models/Pet/Pet";
import PetMapper from "./PetMapper";

export default class AdopterMapper {
  static toEntity(adopter: Adopter | CreateAdopterDTO): AdopterEntity {
    let address: AddressEntity | undefined;
    let pets: Array<PetEntity> | undefined;

    const id = adopter instanceof Adopter ? adopter.id : undefined;
    if (adopter.address) {
      address = new AddressEntity(adopter.address.state, adopter.address.city);
    }

    if (adopter instanceof Adopter && adopter.pets) {
      pets = adopter.pets.map((pet) =>
        PetMapper.toEntity(pet)
      ) as Array<PetEntity>;
    }

    return new AdopterEntity(
      adopter.name,
      adopter.email,
      adopter.password,
      adopter.photo ?? undefined,
      address,
      pets,
      id
    );
  }

  static toModel(adopter: AdopterEntity): Adopter {
    let address: Address | undefined;
    let pets: Array<Pet> | undefined;

    if (adopter.address) {
      address = new Address(
        adopter.address.id,
        adopter.address.state,
        adopter.address.city
      );
    }

    if (adopter instanceof Adopter && adopter.pets) {
      pets = adopter.pets.map((pet) => PetMapper.toModel(pet)) as Array<Pet>;
    }

    return new Adopter(
      adopter.id,
      adopter.name,
      adopter.email,
      adopter.password,
      adopter.photo,
      address,
      pets
    );
  }

  static toResponse(adopter: Adopter): ResponseAdopterDTO {
    return new ResponseAdopterDTO(
      adopter.id,
      adopter.name,
      adopter.email,
      adopter.photo ?? undefined
    );
  }
}
