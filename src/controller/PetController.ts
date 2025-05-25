import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import type { CreatePetDTO } from "../domain/Pet/CreatePetDTO";
import EnumSpecies from "../enum/EnumSpecies";
import Pet from "../domain/Pet/Pet";
import PetRepostiory from "../repository/Pet/PetRepository";
import PetEntity from "../entities/PetEntity";
import { instanceToPlain } from "class-transformer";
import EnumPetSex from "../enum/EnumPetSex";
import isValidEnumValue from "../utils/isValidEnumValue";

export default class PetController {
  constructor(private repository: PetRepostiory) {}

  async createPet(req: Request, res: Response): Promise<void> {
    const { name, species, birthDate, sex } = req.body as CreatePetDTO; //ou <CreatePetDTO>req.body
    
    if (!isValidEnumValue(EnumSpecies, species) && !isValidEnumValue(EnumPetSex, sex)) {
      res.status(400).json({ message: "Invalid species or sex" });
      return;
    }

    const pet = new Pet(
      uuid(),
      name,
      species,
      birthDate,
      sex
    );

    const petCreated = await this.repository.createPet(pet.toEntity());
    if(petCreated) {
        res.status(201).json(instanceToPlain(petCreated)); 
    }
  }

  async createPetsBatch(req: Request, res: Response): Promise<void> {
    const invalidPets: Array<CreatePetDTO> = [];
    const petsToCreate = req.body as Array<CreatePetDTO>;

    const validPets = petsToCreate.filter(pet => {
      const isValid = !isValidEnumValue(EnumSpecies, pet.species) && !isValidEnumValue(EnumPetSex, pet.sex);
      if (!isValid) {
        invalidPets.push(pet);
      }
      return isValid;
    });

    const pets = validPets.map(pet => new Pet(
      uuid(),
      pet.name,
      pet.species,
      pet.birthDate, 
      pet.sex
    ));

    if(pets.length == 0) {
      res.status(400).json({ message: "Invalid species or sex" });
      return;
    }

    const petsCreated = await this.repository.createPet(pets as Array<PetEntity>);

    if(petsCreated) {      
      if(invalidPets.length > 0) {
        res.status(207).json({ 
          message: "Some pets were not created due to invalid attributes.", 
          createdCount: Array.isArray(petsCreated) ? petsCreated.length : 1,
          invalidCount: invalidPets.length,
          created: instanceToPlain(petsCreated),
          invalid: invalidPets 
        });
      } else {
        res.status(201).json(instanceToPlain(petsCreated)); 
      }
    }
  }

  async getAllPets(req: Request, res: Response): Promise<void> {
    const pets = await this.repository.getAllPets();
    if (pets.length == 0) {
      res.status(204).json();
      return;
    }
    res.status(200).json(pets.map(pet => instanceToPlain(pet)));
  }

  async updatePet(req: Request, res: Response): Promise<void> {
    const { id, name, species, birthDate, adopted, sex } = req.body as Pet;

    if (!isValidEnumValue(EnumSpecies, species) && !isValidEnumValue(EnumPetSex, sex)) {
      res.status(400).json({ message: "Invalid species or sex" });
      return;
    }

    const pet = new Pet(id, name, species, birthDate, sex, adopted);
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
