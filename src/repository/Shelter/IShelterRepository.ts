import ShelterEntity from "../../domain/entities/ShelterEntity";
import { ShelterFilters } from "../../domain/models/filters/ShelterFilters";

export default interface IShelterRepository {
   createShelter(shelter: ShelterEntity): Promise<ShelterEntity>;
   updateShelter(id: string, shelter: ShelterEntity): Promise<ShelterEntity | null>;
   addPet(shelterId: string, petId: string): Promise<boolean>;
   
   getShelter(id: string): Promise<ShelterEntity | null>;
   getAllShelters(filters: ShelterFilters): Promise<Array<ShelterEntity>>;

   deleteShelter(id: string): Promise<boolean>;
}