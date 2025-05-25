import { Repository } from "typeorm";
import IPetRepository from "./IPetRepository";
import PetEntity from "../../entities/PetEntity";

export default class PetRepostiory implements IPetRepository {
   private repository: Repository<PetEntity>;

   constructor(repository: Repository<PetEntity>) {
      this.repository = repository;
   }

   async createPet(pet: PetEntity | Array<PetEntity>): Promise<PetEntity | Array<PetEntity>> {
      if(Array.isArray(pet)) {
         return await this.repository.save(pet);
      } else {
         return await this.repository.save(pet);
      }
   }

   async getAllPets(): Promise<Array<PetEntity>> {
      return await this.repository.find();
   }

   async getPet(id: string): Promise<PetEntity | null> {
      return await this.repository.findOneBy({ id });
   }

   async updatePet(id: string, pet: PetEntity): Promise<PetEntity | null> {   
      const petFound = await this.repository.findOneBy({ id });
      if(!petFound) return null;

      Object.assign(petFound, pet);
      return await this.repository.save(petFound);
   }
   
   async deletePet(id: string): Promise<boolean> {
      return (await this.repository.delete(id)).affected !== 0;
   }
}