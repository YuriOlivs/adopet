import Pet from "../models/Pet/Pet";
import PetEntity from "../entities/PetEntity";
import CreatePetDTO from "../models/Pet/CreatePetDTO";

export default class PetMapper {
  static toEntity(
    pet: Pet | Array<Pet> | CreatePetDTO | Array<CreatePetDTO>
  ): PetEntity | Array<PetEntity> {
    if (Array.isArray(pet)) {
      return pet.map((item) => {
        const id = item instanceof Pet ? item.id : undefined;
        return new PetEntity(
          item.name,
          item.species,
          item.birthDate,
          item.sex,
          item.size,
          item.adopted,
          id // ID só é passado se vier de Pet
        );
      });
    }

    const id = pet instanceof Pet ? pet.id : undefined;
    return new PetEntity(
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      pet.adopted,
      id
    );
  }

  static toModel(pet: PetEntity | Array<PetEntity>): Pet | Array<Pet> {
    if (Array.isArray(pet)) {
      return pet.map(
        (pet) =>
          new Pet(
            pet.id,
            pet.name,
            pet.species,
            pet.birthDate,
            pet.sex,
            pet.size,
            pet.adopted
          )
      );
    }
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
