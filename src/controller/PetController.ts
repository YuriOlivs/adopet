import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import type { CreatePetDTO } from "../domain/Pet/CreatePetDTO";
import EnumSpecies from "../enum/EnumSpecies";
import Pet from "../domain/Pet/Pet";
import PetRepostiory from "../repository/Pet/PetRepository";
import PetEntity from "../entities/PetEntity";
import { instanceToPlain } from "class-transformer";

export default class PetController {
  constructor(private repository: PetRepostiory) {}

  async createPet(req: Request, res: Response): Promise<void> {
    const { name, species, birthDate } = req.body as CreatePetDTO; //ou <CreatePetDTO>req.body
    
    if(!Object.values(EnumSpecies).includes(species)) { 
      res.status(400).json({ message: "Invalid species" }); 
    }

    const pet = new Pet(
      uuid(),
      name,
      species,
      birthDate
    );

    const petCreated = await this.repository.createPet(pet.toEntity());
    if(petCreated) {
        res.status(201).json(instanceToPlain(petCreated)); 
    }
  }

  async createPetsBatch(req: Request, res: Response): Promise<void> {
    const petsToCreate = req.body as Array<CreatePetDTO>;
    const pets = petsToCreate.map(pet => new Pet(
      uuid(),
      pet.name,
      pet.species,
      pet.birthDate
    ));

    pets.forEach(pet => {
      if(!Object.values(EnumSpecies).includes(pet.species)) { 
        res.status(400).json({ message: "Invalid species" }); 
      }
    });

    const petsCreated = await this.repository.createPet(pets as Array<PetEntity>);
    if(petsCreated) {
        res.status(201).json(instanceToPlain(petsCreated)); 
    }
  }

  async getAllPets(req: Request, res: Response): Promise<void> {
    const pets = await this.repository.getAllPets();
    if (pets.length === 0) {
      res.status(204);
    }
    res.status(200).json(pets.map(pet => instanceToPlain(pet)));
  }

  async updatePet(req: Request, res: Response): Promise<void> {
    const { id, name, species, birthDate, adopted } = req.body as Pet;

    if(!Object.values(EnumSpecies).includes(species)) { 
      res.status(400).json({ message: "Invalid species" }); 
    }

    const pet = new Pet(id, name, species, birthDate, adopted);
    pet.setAdopted(adopted);
    
    const petUpdated = await this.repository.updatePet(id, pet.toEntity());
    if(petUpdated) {
      res.status(200).json(instanceToPlain(petUpdated));
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  }

  async deletePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const petDeleted = await this.repository.deletePet(id);
    if(petDeleted) {
      res.status(200).json({ message: "Pet deleted" });
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  }
}
