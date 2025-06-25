import ResponseAdopterDTO from "../Adopter/ResponseAdopterDTO";
import ResponseShelterDTO from "../Shelter/ResponseShelterDTO";

export default class ResponsePetDTO {
  id: string;
  name: string;
  species: string;
  birthDate: Date;
  sex: string;
  size: string;
  shelter: ResponseShelterDTO | null;
  adopter?: ResponseAdopterDTO | null;

  constructor(
    id: string,
    name: string,
    species: string,
    birthDate: Date,
    sex: string,
    size: string,
    adopter?: ResponseAdopterDTO,
    shelter?: ResponseShelterDTO,
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.birthDate = birthDate;
    this.sex = sex;
    this.size = size;
    this.shelter = shelter ?? null;
    this.adopter = adopter ?? null;
  }
}
