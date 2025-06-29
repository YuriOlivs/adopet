import PetEntity from "../../domain/entities/PetEntity";
import { PetFilters } from "../../domain/models/filters/PetFilters";

export default interface IPetRepository {
   createPet(pet: PetEntity): Promise<PetEntity | Array<PetEntity>>;
   updatePet(id: string, pet: PetEntity): Promise<PetEntity | null>;
   adoptPet(petId: string, adopterId: string): Promise<PetEntity | null>;

   getAllPets(filters: PetFilters): Promise<Array<PetEntity>>;
   getPet(id: string): Promise<PetEntity | null>;
   getPetsByShelter(shelterId: string): Promise<Array<PetEntity> | null>;

   deletePet(id: string): Promise<boolean>;
}