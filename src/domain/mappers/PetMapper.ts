import Pet from "../models/Pet/Pet";
import PetEntity from "../entities/PetEntity";

export default class PetMapper {
   static toEntity(pet: Pet): PetEntity {
      return new PetEntity(
         pet.id,
         pet.name,
         pet.species,
         pet.birthDate,
         pet.sex,
         pet.size,
         pet.adopted
      );
   }

   static toDomain(pet: PetEntity): Pet {
      return new Pet(
         pet.id,
         pet.name,
         pet.species,
         pet.birthDate,
         pet.sex,
         pet.size,
         pet.adopted
      );
   }
}