import PetSex from "../../../enum/PetSex";
import Size from "../../../enum/Size";
import Species from "../../../enum/Species";
import { Expose } from "class-transformer";
import Adopter from "../Adopter/Adopter";
import Shelter from "../Shelter/Shelter";

export default class Pet {
  @Expose({ name: "id" })
  private _id: string;

  @Expose({ name: "name" })
  private _name: string;

  @Expose({ name: "species" })
  private _species: Species;

  @Expose({ name: "birthDate" })
  private _birthDate: Date;

  @Expose({ name: "sex" })
  private _sex: PetSex;

  @Expose({ name: "size" })
  private _size: Size;

  @Expose({ name: "shelter" })
  private _shelter: Omit<Shelter, "pets">;

  @Expose({ name: "adopter" })
  private _adopter?: Adopter | null;

  constructor(
    id: string,
    name: string,
    species: Species,
    birthDate: Date,
    sex: PetSex,
    size: Size,
    shelter: Shelter,
    adopter?: Adopter
  ) {
    this._id = id;
    this._name = name;
    this._species = species;
    this._birthDate = birthDate;
    this._sex = sex;
    this._size = size;
    this._shelter = shelter;
    this._adopter = adopter ?? null;
  }

  isAdopted(): boolean { return this._adopter ? true : false; }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get species(): Species { return this._species; }
  get birthDate(): Date { return this._birthDate; }
  get sex(): PetSex { return this._sex; }
  get size(): Size { return this._size; }
  get shelter(): Omit<Shelter, "pets"> { return this._shelter; }
  get adopter(): Adopter | null { return this._adopter || null; }

  setId(id: string) { this._id = id; }
  setName(name: string) { this._name = name; }
  setSpecies(species: Species) { this._species = species; }
  setBirthDate(birthDate: Date) { this._birthDate = birthDate; }
  setSex(sex: PetSex) { this._sex = sex; }
  setSize(size: Size) { this._size = size; }
  setShelter(shelter: Shelter) { this._shelter = shelter; }
  setAdopted(adopted: Adopter) { this._adopter = adopted; }
}
