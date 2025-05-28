import Pet from "../models/Pet/Pet";
import PetEntity from "../entities/PetEntity";
import CreatePetDTO from "../models/Pet/CreatePetDTO";
import AdopterMapper from "./AdopterMapper";

export default class PetMapper {
  static toEntity(
    pet: Pet | Array<Pet> | CreatePetDTO | Array<CreatePetDTO>
  ): PetEntity | Array<PetEntity> {
    if (Array.isArray(pet)) {
      return pet.map(item => {
        const id = item instanceof Pet ? item.id : undefined;
        const adopter = item instanceof Pet && item.adopter ? 
                          AdopterMapper.toEntity(item.adopter) : undefined;

        return new PetEntity(
          item.name,
          item.species,
          item.birthDate,
          item.sex,
          item.size,
          id,
          adopter
        );
      });
    }

    const id = pet instanceof Pet ? pet.id : undefined;
        const adopter = pet instanceof Pet && pet.adopter ? 
                          AdopterMapper.toEntity(pet.adopter) : undefined;
    return new PetEntity(
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      id,
      adopter
    );
  }

  static toModel(pet: PetEntity | Array<PetEntity>): Pet | Array<Pet> {
    if (Array.isArray(pet)) {
      return pet.map(pet => {
        const adopter = pet.adopter ? AdopterMapper.toModel(pet.adopter) : undefined;
        return new Pet(
          pet.id,
          pet.name,
          pet.species,
          pet.birthDate,
          pet.sex,
          pet.size,
          adopter
        );
      });
    }

    const adopter = pet.adopter ? AdopterMapper.toModel(pet.adopter) : undefined;
    return new Pet(
      pet.id,
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      adopter
    );
  }
}
