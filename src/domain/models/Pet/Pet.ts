import EnumPetSex from "../../../enum/EnumPetSex";
import EnumSize from "../../../enum/EnumSize";
import EnumSpecies from "../../../enum/EnumSpecies";
import { Expose } from "class-transformer";
import Adopter from "../Adopter/Adopter";

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

  @Expose({ name: "adopter" })
  private _adopter?: Adopter | null;

  constructor(
    id: string,
    name: string,
    species: EnumSpecies,
    birthDate: Date,
    sex: EnumPetSex,
    size: EnumSize,
    adopter?: Adopter
  ) {
    this._id = id;
    this._name = name;
    this._species = species;
    this._birthDate = birthDate;
    this._sex = sex;
    this._size = size;
    this._adopter = adopter ?? null;
  }

  isAdopted(): boolean { return this._adopter ? true : false; }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get species(): EnumSpecies { return this._species; }
  get birthDate(): Date { return this._birthDate; }
  get sex(): EnumPetSex { return this._sex; }
  get size(): EnumSize { return this._size; }
  get adopter(): Adopter | null { return this._adopter || null; }

  setId(id: string) { this._id = id; }
  setName(name: string) { this._name = name; }
  setSpecies(species: EnumSpecies) { this._species = species; }
  setBirthDate(birthDate: Date) { this._birthDate = birthDate; }
  setSex(sex: EnumPetSex) { this._sex = sex; }
  setSize(size: EnumSize) { this._size = size; }
  setAdopted(adopted: Adopter) { this._adopter = adopted; }
}
