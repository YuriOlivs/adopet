import { Request, Response } from "express";
import CreatePetDTO from "../domain/models/Pet/CreatePetDTO";
import EnumSpecies from "../enum/EnumSpecies";
import Pet from "../domain/models/Pet/Pet";
import PetRepostiory from "../repository/Pet/PetRepository";
import PetEntity from "../domain/entities/PetEntity";
import { instanceToPlain } from "class-transformer";
import EnumPetSex from "../enum/EnumPetSex";
import isValidEnumValue from "../utils/isValidEnumValue";
import PetMapper from "../domain/mappers/PetMapper";
import EnumSize from "../enum/EnumSize";

export default class PetController {
  constructor(private repository: PetRepostiory) { }

  async createPet(req: Request, res: Response): Promise<void> {
    try {
      const { name, species, birthDate, sex, size } = req.body as CreatePetDTO; //ou <CreatePetDTO>req.body

      if (!isValidEnumValue(EnumSpecies, species)) {
        res.status(400).json({ message: "Invalid species" });
        return;
      }

      if (!isValidEnumValue(EnumPetSex, sex)) {
        res.status(400).json({ message: "Invalid sex" });
        return;
      }

      if (!isValidEnumValue(EnumSize, size)) {
        res.status(400).json({ message: "Invalid size" });
        return;
      }

      const pet = new CreatePetDTO(
        name,
        species,
        birthDate,
        sex,
        size
      );

      const entityCreated = await this.repository.createPet(PetMapper.toEntity(pet));
      if (entityCreated) {
        const model = PetMapper.toModel(entityCreated);
        res.status(201).json(instanceToPlain(PetMapper.toResponse(model)));
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

      if (validPets.length == 0) {
        res.status(400).json({ message: "Invalid species, sex or size for the given pets" });
        return;
      }

      const entitiesCreated = await this.repository.createPet(PetMapper.toEntity(validPets));

      if (entitiesCreated) {
        const model = PetMapper.toModel(entitiesCreated);

        if (invalidPets.length > 0) {
          res.status(207).json({
            message: "Some pets were not created due to invalid attributes.",
            createdCount: Array.isArray(entitiesCreated) ? entitiesCreated.length : 1,
            invalidCount: invalidPets.length,
            created: instanceToPlain(PetMapper.toResponse(model)),
            invalid: invalidPets
          });
        } else {
          res.status(201).json(instanceToPlain(entitiesCreated));
        }
      }
    }
    catch (err) {
      res.status(500).json({ message: "Error creating pets" });
    }
  }

  async getPet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const entity = await this.repository.getPet(id);
      if (entity) {
        const model = PetMapper.toModel(entity);
        res.status(200).json(instanceToPlain(PetMapper.toResponse(model)));
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch (err) {
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
      res.status(200).json(pets.map(pet => {
        const model = PetMapper.toModel(pet);
        return instanceToPlain(PetMapper.toResponse(model));
      }));
    }
    catch (err) {
      res.status(500).json({ message: "Error getting pets" });
    }
  }

  async updatePet(req: Request, res: Response): Promise<void> {
    try {
      const { name, species, birthDate, adopter, sex, size } = req.body as Pet;
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
        adopter ?? undefined
      );

      const entityUpdated = await this.repository.updatePet(id, PetMapper.toEntity(pet) as PetEntity);
      if (entityUpdated) {
        const model = PetMapper.toModel(entityUpdated);
        res.status(200).json(instanceToPlain(PetMapper.toResponse(model)));
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch (err) {
      res.status(500).json({ message: "Error updating pet" });
    }
  }

  async deletePet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const petDeleted = await this.repository.deletePet(id);
      if (petDeleted) {
        res.status(200).json({ message: "Pet deleted" });
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch (err) {
      res.status(500).json({ message: "Error deleting pet" });
    }
  }

  async adoptPet(req: Request, res: Response): Promise<void> {
    try {
      const { petId, adopterId } = req.params;
      const entity = await this.repository.adoptPet(petId, adopterId);
      
      if(entity) {
        const model = PetMapper.toModel(entity);
        res.status(200).json(instanceToPlain(PetMapper.toResponse(model)));
      }
      else {
        res.status(404).json({ message: "Pet not found" });
      }
    }
    catch (err) {
      res.status(500).json({ message: "Error adopting pet" });
    }
  }
}
