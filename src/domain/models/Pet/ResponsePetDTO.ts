import ResponseAdopterDTO from "../Adopter/ResponseAdopterDTO";

export default class ResponsePetDTO {
  id: string;
  name: string;
  species: string;
  birthDate: Date;
  sex: string;
  size: string;
  adopter?: ResponseAdopterDTO | null;

  constructor(
    id: string,
    name: string,
    species: string,
    birthDate: Date,
    sex: string,
    size: string,
    adopter?: ResponseAdopterDTO,
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.birthDate = birthDate;
    this.sex = sex;
    this.size = size;
    this.adopter = adopter ?? null;
  }
}
