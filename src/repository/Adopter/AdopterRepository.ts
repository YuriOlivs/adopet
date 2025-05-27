import IAdopterRepository from "./IAdopterRepository";
import AdopterEntity from "../../domain/entities/Adopter/AdopterEntity";
import { Repository } from "typeorm";

export default class AdopterRepository implements IAdopterRepository {
   private repository: Repository<AdopterEntity>;

   constructor(repository: Repository<AdopterEntity>) {
      this.repository = repository;
   }

   async createAdopter(adopter: AdopterEntity): Promise<AdopterEntity> {
      return await this.repository.save(adopter);
   }

   async getAdopter(id: string): Promise<AdopterEntity | null> {
      return await this.repository.findOneBy({ id });
   }

   async updateAdopter(id: string, adopter: AdopterEntity): Promise<AdopterEntity | null> {
      const adopterFound = await this.repository.findOneBy({ id });
      if (!adopterFound) return null;

      Object.assign(adopterFound, adopter);
      return await this.repository.save(adopterFound);
   }

   async deleteAdopter(id: string): Promise<boolean> {
      return (await this.repository.delete(id)).affected !== 0;
   }
}