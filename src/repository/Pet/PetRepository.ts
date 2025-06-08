import { Repository } from "typeorm";
import IPetRepository from "./IPetRepository";
import PetEntity from "../../domain/entities/PetEntity";
import AdopterEntity from "../../domain/entities/AdopterEntity";
import { PetFilters } from "../../domain/models/PetFilters";
import { ILike } from "typeorm";
import { NotFound } from "../../domain/models/ErrorHandler";

export default class PetRepostiory implements IPetRepository {
   private repository: Repository<PetEntity>;
   private adopterRepository: Repository<AdopterEntity>

   constructor(repository: Repository<PetEntity>, adopterRepository: Repository<AdopterEntity>) {
      this.repository = repository;
      this.adopterRepository = adopterRepository
   }

   async createPet(pet: PetEntity | Array<PetEntity>): Promise<PetEntity | Array<PetEntity>> {
      if (Array.isArray(pet)) {
         return await this.repository.save(pet);
      } else {
         return await this.repository.save(pet);
      }
   }

   async getAllPets(filters: PetFilters): Promise<Array<PetEntity>> {
      const where: any = {};

      if (filters.query) where.name = ILike(`%${filters.query}%`);
      if (filters.size) where.size = filters.size;
      if (filters.species) where.species = filters.species;
      if (filters.sex) where.sex = filters.sex;

      return await this.repository.find({ where, relations: ['adopter'] });
   }

   async getPet(id: string): Promise<PetEntity | null> {
      return await this.repository.findOne({ 
         where: { id },
         relations: ['adopter'] 
      });;
   }

   async updatePet(id: string, pet: PetEntity): Promise<PetEntity | null> {
      const petFound = await this.repository.findOneBy({ id });
      if (!petFound) return null;

      Object.assign(petFound, pet);
      return await this.repository.save(petFound);
   }

   async deletePet(id: string): Promise<boolean> {
      return (await this.repository.delete(id)).affected !== 0;
   }

   async adoptPet(petId: string, adopterId: string): Promise<PetEntity | null> {

      const pet = await this.repository.findOneBy({ id: petId });
      if(!pet) throw new NotFound("Pet not found")

      const adopter = await this.adopterRepository.findOneBy({ id: adopterId });
      if(!adopter) throw new NotFound("Adopter not found");

      pet.adopter = adopter;
      return await this.repository.save(pet);
   }
}