import ShelterEntity from "../../domain/entities/ShelterEntity";

export default interface IShelterRepository {
   createShelter(shelter: ShelterEntity): Promise<ShelterEntity>;
   updateShelter(id: string, shelter: ShelterEntity): Promise<ShelterEntity | null>;
   
   getShelter(id: string): Promise<ShelterEntity | null>;
   getAllShelters(): Promise<Array<ShelterEntity>>;

   deleteShelter(id: string): Promise<boolean>;
}