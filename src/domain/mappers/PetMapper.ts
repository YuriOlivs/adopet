import Pet from "../models/Pet/Pet";
import PetEntity from "../entities/PetEntity";
import CreatePetDTO from "../models/Pet/CreatePetDTO";
import AdopterMapper from "./AdopterMapper";
import ResponsePetDTO from "../models/Pet/ResponsePetDTO";
import ShelterMapper from "./ShelterMapper";
import ShelterEntity from "../entities/ShelterEntity";

export default class PetMapper {
  static toEntity(
    pet: Pet | Array<Pet> | CreatePetDTO | Array<CreatePetDTO>
  ): PetEntity | Array<PetEntity> {
    if (Array.isArray(pet)) {
      return pet.map((item) => this.toEntity(item) as PetEntity);
    }
    
    let shelter = undefined;
    const id = pet instanceof Pet ? pet.id : undefined;

    const adopter =
      pet instanceof Pet && pet.adopter
        ? AdopterMapper.toEntity(pet.adopter)
        : undefined;

    console.log(pet);
    if (pet instanceof Pet && pet.shelter) {
      shelter = ShelterMapper.toEntity(pet.shelter);
    }

    const dummy = new CreatePetDTO(
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      ''
    );

    if (Object.keys(dummy).every(key => key in pet)) {
      shelter = ShelterEntity.fromId((pet as CreatePetDTO).shelter);
    }

    return new PetEntity(
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      id,
      adopter,
      shelter
    );
  }

  static toModel(pet: PetEntity | Array<PetEntity>): Pet | Array<Pet> {
    if (Array.isArray(pet)) {
      return pet.map((pet) => this.toModel(pet) as Pet);
    }

    const adopter = pet.adopter
      ? AdopterMapper.toModel(pet.adopter)
      : undefined;

    const shelter = pet.shelter
      ? ShelterMapper.toModel(pet.shelter)
      : undefined;

    return new Pet(
      pet.id,
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      adopter,
      shelter
    );
  }

  static toResponse(
    pet: Pet | Array<Pet>
  ): Array<ResponsePetDTO> | ResponsePetDTO {
    if (Array.isArray(pet)) {
      return pet.map((pet) => this.toResponse(pet) as ResponsePetDTO);
    }

    const adopter = pet.adopter
      ? AdopterMapper.toResponse(pet.adopter)
      : undefined;

    const shelter = pet.shelter
      ? ShelterMapper.toResponse(pet.shelter)
      : undefined;

    return new ResponsePetDTO(
      pet.id,
      pet.name,
      pet.species,
      pet.birthDate,
      pet.sex,
      pet.size,
      adopter,
      shelter
    );
  }
}
