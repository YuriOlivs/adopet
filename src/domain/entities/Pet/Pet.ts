import PetEntity from "./PetEntity";
import EnumPetSex from "../../../enum/EnumPetSex";
import EnumSize from "../../../enum/EnumSize";
import EnumSpecies from "../../../enum/EnumSpecies";
import { Expose } from "class-transformer";

export default class Pet {
  @Expose({ name: "id" })
  private _id: string;

  @Expose({ name: "name" })
  private _name: string;

  @Expose({ name: "species" })
  private _species: EnumSpecies;

  @Expose({ name: "birthDate" })
  private _birthDate: Date;

  @Expose({ name: "sex" })
  private _sex: EnumPetSex;

  @Expose({ name: "size" })
  private _size: EnumSize;

  @Expose({ name: "adopted" })
  private _adopted: boolean;

  constructor(
    id: string,
    name: string,
    species: EnumSpecies,
    birthDate: Date,
    sex: EnumPetSex,
    size: EnumSize,
    adopted?: boolean
  ) {
    this._id = id;
    this._name = name;
    this._species = species;
    this._birthDate = birthDate;
    this._sex = sex;
    this._size = size;
    this._adopted = adopted || false;
  }

  toEntity(): PetEntity {
    return new PetEntity(
      this._id,
      this._name,
      this._species,
      this._birthDate,
      this._sex,
      this._size,
      this._adopted
    );
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get species(): EnumSpecies { return this._species; }
  get birthDate(): Date { return this._birthDate; }
  get sex(): EnumPetSex { return this._sex; }
  get size(): EnumSize { return this._size; }
  get adopted(): boolean { return this._adopted; }

  setId(id: string) { this._id = id; }
  setName(name: string) { this._name = name; }
  setSpecies(species: EnumSpecies) { this._species = species; }
  setBirthDate(birthDate: Date) { this._birthDate = birthDate; }
  setSex(sex: EnumPetSex) { this._sex = sex; }
  setSize(size: EnumSize) { this._size = size; }
  setAdopted(adopted: boolean) { this._adopted = adopted; }
}
