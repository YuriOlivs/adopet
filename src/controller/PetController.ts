import { Request, Response } from "express";
import CreatePetDTO from "../domain/models/Pet/CreatePetDTO";
import Pet from "../domain/models/Pet/Pet";
import PetRepostiory from "../repository/Pet/PetRepository";
import PetEntity from "../domain/entities/PetEntity";
import { instanceToPlain } from "class-transformer";
import PetMapper from "../domain/mappers/PetMapper";
import { PetFilters } from "../domain/models/PetFilters";
import ResponseAPI from "../domain/models/ResponseAPI";
import { BadRequest, NotFound } from "../domain/models/ErrorHandler";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export default class PetController {
  constructor(private repository: PetRepostiory) {}

  async createPet(
    req: Request<Record<string, string>, {}, CreatePetDTO>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const { name, species, birthDate, sex, size } = req.body;

    const pet = new CreatePetDTO(
      name,
      species,
      birthDate,
      sex,
      size
    );

    const entityCreated = await this.repository.createPet(
      PetMapper.toEntity(pet)
    );

    if (entityCreated) {
      const model = PetMapper.toModel(entityCreated);
      res.status(HttpStatusCode.CREATED).json(
        new ResponseAPI(
          "Pet created",
          instanceToPlain(PetMapper.toResponse(model))
        )
      );
    }
  }

  async createPetsBatch(
    req: Request<Record<string, string>, {}, Array<CreatePetDTO>>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const petsToCreate = req.body;

    if (!petsToCreate.length) {
      throw new BadRequest("Empty body");
    }

    const entitiesCreated = await this.repository.createPet(
      PetMapper.toEntity(petsToCreate)
    );

    if (entitiesCreated) {
      const model = PetMapper.toModel(entitiesCreated);

      res.status(HttpStatusCode.CREATED).json(
        new ResponseAPI(
          "Pets created",
          instanceToPlain(PetMapper.toResponse(model))
        )
      );
    }
  }

  async getPet(
    req: Request<Record<string, string>, {}, {}>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const { id } = req.params;

    const entity = await this.repository.getPet(id);

    if (entity) {
      const model = PetMapper.toModel(entity);
      res.status(HttpStatusCode.OK).json(
        new ResponseAPI(
          "Pet found",
          instanceToPlain(PetMapper.toResponse(model))
        )
      );
    } else {
      throw new NotFound("Pet not found");
    }
  }

  async getAllPets(
    req: Request<Record<string, string>, {}, {}, PetFilters>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const filters = req.query;
    const pets = await this.repository.getAllPets(filters);

    if (pets.length == 0) {
      res.status(204).json(new ResponseAPI("No pets found"));
      return;
    }

    res.status(HttpStatusCode.OK).json(
      new ResponseAPI(
        "Pets found",
        pets.map((pet) => {
          const model = PetMapper.toModel(pet);
          return instanceToPlain(PetMapper.toResponse(model));
        })
      )
    );
  }

  async updatePet(
    req: Request<Record<string, string>, {}, CreatePetDTO>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const { name, species, birthDate, sex, size } = req.body;
    const { id } = req.params;

    const pet = new Pet(
      id,
      name,
      species,
      birthDate,
      sex,
      size
    );

    const entityUpdated = await this.repository.updatePet(
      id,
      PetMapper.toEntity(pet) as PetEntity
    );

    if (entityUpdated) {
      const model = PetMapper.toModel(entityUpdated);
      res.status(HttpStatusCode.OK).json(
        new ResponseAPI(
          "Pet updated",
          instanceToPlain(PetMapper.toResponse(model))
        )
      );
    } else {
      throw new NotFound("Pet not found");
    }
  }

  async deletePet(
    req: Request<Record<string, string>, {}, {}>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const { id } = req.params;

    const petDeleted = await this.repository.deletePet(id);

    if (petDeleted) {
      res.status(HttpStatusCode.OK).json(new ResponseAPI("Pet deleted"));
    } else {
      throw new NotFound("Pet not found");
    }
  }

  async adoptPet(
    req: Request<Record<string, string>, {}, {}>,
    res: Response<ResponseAPI>
  ): Promise<void> {
    const { petId, adopterId } = req.params;

    const entity = await this.repository.adoptPet(petId, adopterId);

    if (entity) {
      const model = PetMapper.toModel(entity);
      res.status(HttpStatusCode.OK).json(
        new ResponseAPI(
          "Pet adopted",
          instanceToPlain(PetMapper.toResponse(model))
        )
      );
    }
  }
}
