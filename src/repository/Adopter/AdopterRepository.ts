import IAdopterRepository from "./IAdopterRepository";
import AdopterEntity from "../../domain/entities/AdopterEntity";
import { Repository } from "typeorm";
import AddressEntity from "../../domain/entities/AddressEntity";
import { Conflict } from "../../domain/models/ErrorHandler";

export default class AdopterRepository implements IAdopterRepository {
   private repository: Repository<AdopterEntity>;

   constructor(repository: Repository<AdopterEntity>) {
      this.repository = repository;
   }

   async createAdopter(adopter: AdopterEntity): Promise<AdopterEntity> {
      if (await this.checkExistingEmail(adopter.email)) throw new Conflict("Email already exists");
      return await this.repository.save(adopter);
   }

   async getAdopter(id: string): Promise<AdopterEntity | null> {
      return await this.repository.findOneBy({ id });
   }

   async getAllAdopters(): Promise<Array<AdopterEntity>> {
      return await this.repository.find();
   }

   async updateAdopter(id: string, adopter: AdopterEntity): Promise<AdopterEntity | null> {
      const adopterFound = await this.repository.findOneBy({ id });
      if (!adopterFound) return null;

      Object.assign(adopterFound, adopter);
      return await this.repository.save(adopterFound);
   }

   async updateAddress(id: string, address: AddressEntity): Promise<AdopterEntity | null> {
      const adopterFound = await this.repository.findOneBy({ id });
      if (!adopterFound) return null;

      adopterFound.address = address;
      return await this.repository.save(adopterFound);
   }

   async deleteAdopter(id: string): Promise<boolean> {
      return (await this.repository.delete(id)).affected !== 0;
   }

   private async checkExistingEmail(email: string) {
      return await this.repository.findOneBy({ email });
   }
}