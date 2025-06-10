import PetSex from "../../../enum/PetSex";
import Size from "../../../enum/Size";
import Species from "../../../enum/Species";
import Shelter from "../Shelter/Shelter";

export default class CreatePetDTO {
  name: string;
  species: Species;
  birthDate: Date;
  sex: PetSex;
  size: Size;
  adopted: boolean;
  shelter: Pick<Shelter, "id">;

  constructor(
    name: string,
    species: Species,
    birthDate: Date,
    sex: PetSex,
    size: Size,
    shelter: Pick<Shelter, "id">
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
