import { Repository } from "typeorm/repository/Repository";
import ShelterEntity from "../../domain/entities/ShelterEntity";
import IShelterRepository from "./IShelterRepository";

export default class ShelterRepository implements IShelterRepository {
   private repository: Repository<ShelterEntity>

   constructor(repository: Repository<ShelterEntity>) {
      this.repository = repository;
   }

   async createShelter(shelter: ShelterEntity): Promise<ShelterEntity> {
      return await this.repository.save(shelter);
   }
   async updateShelter(id: string, shelter: ShelterEntity): Promise<ShelterEntity | null> {
      const shelterFound = await this.repository.findOneBy({ id });
      if (!shelterFound) return null;

      Object.assign(shelterFound, shelter);
      return await this.repository.save(shelterFound);
   }
   async getShelter(id: string): Promise<ShelterEntity | null> {
      return await this.repository.findOne({
         where: { id },
         relations: ['pets']
      })
   }
   async getAllShelters(): Promise<Array<ShelterEntity>> {
      return await this.repository.find();
   }
   async deleteShelter(id: string): Promise<boolean> {
      return (await this.repository.delete(id)).affected !== 0;
   }
}