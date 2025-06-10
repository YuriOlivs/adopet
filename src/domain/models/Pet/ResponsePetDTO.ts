import ResponseAdopterDTO from "../Adopter/ResponseAdopterDTO";
import Shelter from "../Shelter/Shelter";

export default class ResponsePetDTO {
  id: string;
  name: string;
  species: string;
  birthDate: Date;
  sex: string;
  size: string;
  shelter: Omit<Shelter, "pets">
  adopter?: ResponseAdopterDTO | null;

  constructor(
    id: string,
    name: string,
    species: string,
    birthDate: Date,
    sex: string,
    size: string,
    shelter: Omit<Shelter, "pets">,
    adopter?: ResponseAdopterDTO,
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.birthDate = birthDate;
    this.sex = sex;
    this.size = size;
    this.shelter = shelter;
    this.adopter = adopter ?? null;
  }
}
