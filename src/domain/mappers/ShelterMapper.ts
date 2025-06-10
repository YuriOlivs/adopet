import AddressEntity from "../entities/AddressEntity";
import PetEntity from "../entities/PetEntity";
import ShelterEntity from "../entities/ShelterEntity";
import Address from "../models/Address/Address";
import Pet from "../models/Pet/Pet";
import ResponsePetDTO from "../models/Pet/ResponsePetDTO";
import CreateShelterDTO from "../models/Shelter/CreateShelterDTO";
import ResponseShelterDTO from "../models/Shelter/ResponseShelterDTO";
import Shelter from "../models/Shelter/Shelter";
import PetMapper from "./PetMapper";

export default class ShelterMapper {
  static toEntity(shelter: CreateShelterDTO | Shelter): ShelterEntity {
    let pets: Array<PetEntity> = [];
    const id = shelter instanceof Shelter ? shelter.id : undefined;

    const address = new AddressEntity(
      shelter.address.state,
      shelter.address.city
    );

    if (shelter instanceof Shelter && shelter.pets && shelter.pets.length > 0) {
      pets = PetMapper.toEntity(shelter.pets) as Array<PetEntity>;
    }

    return new ShelterEntity(
      shelter.name,
      shelter.password,
      shelter.email,
      shelter.phone,
      address,
      id,
      pets
    );
  }

  static toModel(shelter: ShelterEntity) {
    let pets: Array<Pet> = [];

    const address = new Address(
      shelter.address.id,
      shelter.address.state,
      shelter.address.city
    );

    if (shelter.pets && shelter.pets.length > 0) {
      pets = PetMapper.toModel(shelter.pets) as Array<Pet>;
    }

    return new Shelter(
      shelter.id,
      shelter.name,
      shelter.password,
      shelter.email,
      shelter.phone,
      address,
      pets
    );
  }

  static toResponse(shelter: Shelter): ResponseShelterDTO {
   let pets: Array<Omit<ResponsePetDTO, "shelter">> = [];

   if (shelter.pets && shelter.pets.length > 0) {
     pets = shelter.pets.map((pet) => {
       return {
         id: pet.id,
         name: pet.name,
         species: pet.species,
         birthDate: pet.birthDate,
         sex: pet.sex,
         size: pet.size,
       };
     })   
   }

    return {
      id: shelter.id,
      name: shelter.name,
      email: shelter.email,
      phone: shelter.phone,
      address: shelter.address,
      pets: pets
    };
  }
}
