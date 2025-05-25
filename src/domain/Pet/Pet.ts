import PetEntity from "../../entities/PetEntity";
import EnumSpecies from "../../enum/EnumSpecies";
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

   @Expose({ name: "adopted" })
   private _adopted: boolean;

   constructor(id: string, name: string, species: EnumSpecies, birthDate: Date, adopted?: boolean) {
      this._id = id;
      this._name = name;
      this._species = species;
      this._birthDate = birthDate;
      this._adopted = adopted || false;
   }

   toEntity(): PetEntity {
      const entity = new PetEntity();
      entity.id = this._id;
      entity.name = this._name;
      entity.species = this._species;
      entity.birthDate = this._birthDate;
      entity.adopted = this._adopted;
      return entity;
   }

   get id(): string { return this._id; }
   get name(): string { return this._name; }
   get species(): EnumSpecies { return this._species; }
   get birthDate(): Date { return this._birthDate; }
   get adopted(): boolean { return this._adopted; }

   setId(id: string) { this._id = id; }
   setName(name: string) { this._name = name; }
   setSpecies(species: EnumSpecies) { this._species = species; }
   setBirthDate(birthDate: Date) { this._birthDate = birthDate; }
   setAdopted(adopted: boolean) { this._adopted = adopted; }
}