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
    try {
      const { name, species, birthDate, sex, size } = req.body as CreatePetDTO; //ou <CreatePetDTO>req.body
      
      if (!isValidEnumValue(EnumSpecies, species) && !isValidEnumValue(EnumPetSex, sex)) {
        res.status(400).json({ message: "Invalid species or sex" });
        return;
      }

      const pet = new Pet(
        uuid(),
        name,
        species,
        birthDate,
        sex, 
        size
      );

      const petCreated = await this.repository.createPet(pet.toEntity());
      if(petCreated) {
          res.status(201).json(instanceToPlain(petCreated)); 
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating pet" });
    }
  }

  async createPetsBatch(req: Request, res: Response): Promise<void> {
    try {
      const invalidPets: Array<CreatePetDTO> = [];
      const petsToCreate = req.body as Array<CreatePetDTO>;

      const validPets = petsToCreate.filter(pet => {
        const isValid =
          isValidEnumValue(EnumSpecies, pet.species) &&
          isValidEnumValue(EnumPetSex, pet.sex);

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
        pet.sex,
        pet.size
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
    catch(err) {
      res.status(500).json({ message: "Error creating pets" });
    }
  }

  async getPet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pet = await this.repository.getPet(id);
      if(pet) {
        res.status(200).json(instanceToPlain(pet));
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch(err) {
      res.status(500).json({ message: "Error getting pet" });
    }
  }

  async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const pets = await this.repository.getAllPets();
      if (pets.length == 0) {
        res.status(204).json();
        return;
      }
      res.status(200).json(pets.map(pet => instanceToPlain(pet)));
    }
    catch(err) {
      res.status(500).json({ message: "Error getting pets" });
    }
  }

  async updatePet(req: Request, res: Response): Promise<void> {
    try {
      const { name, species, birthDate, adopted, sex, size } = req.body as Pet;
      const { id } = req.params;

      if (!isValidEnumValue(EnumSpecies, species) && !isValidEnumValue(EnumPetSex, sex)) {
        res.status(400).json({ message: "Invalid species or sex" });
        return;
      }

      const pet = new Pet(
        id, 
        name, 
        species, 
        birthDate,
        sex, 
        size,
        adopted
      );

      pet.setAdopted(adopted);
      
      const petUpdated = await this.repository.updatePet(id, pet.toEntity());
      if(petUpdated) {
        res.status(200).json(instanceToPlain(petUpdated));
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch(err) {
      res.status(500).json({ message: "Error updating pet" });
    }
  }

  async deletePet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const petDeleted = await this.repository.deletePet(id);
      if(petDeleted) {
        res.status(200).json({ message: "Pet deleted" });
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch(err) {
      res.status(500).json({ message: "Error deleting pet" });
    }
  }
}
