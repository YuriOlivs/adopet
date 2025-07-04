import PetSex from "../../../enum/PetSex";
import Size from "../../../enum/Size";
import Species from "../../../enum/Species";

export default class CreatePetDTO {
  name: string;
  species: Species;
  birthDate: Date;
  sex: PetSex;
  size: Size;
  adopted: boolean;
  shelter: string;

  constructor(
    name: string,
    species: Species,
    birthDate: Date,
    sex: PetSex,
    size: Size,
    shelter: string
  ) {
    this.name = name;
    this.species = species;
    this.birthDate = birthDate;
    this.sex = sex;
    this.size = size;
    this.adopted = false;
    this.shelter = shelter;
  }
}
