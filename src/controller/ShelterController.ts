import { Request, Response } from "express";
import ShelterRepository from "../repository/Shelter/ShelterRepository";
import CreateShelterDTO from "../domain/models/Shelter/CreateShelterDTO";
import ResponseAPI from "../domain/models/ResponseAPI";
import AddressEntity from "../domain/entities/AddressEntity";
import ShelterMapper from "../domain/mappers/ShelterMapper";
import { instanceToPlain } from "class-transformer";
import { HttpStatusCode } from "../enum/HttpStatusCode";
import { ShelterFilters } from "../domain/models/filters/ShelterFilters";
import { InternalServerError, NotFound } from "../domain/models/ErrorHandler";

export default class ShelterController {
  constructor(private repository: ShelterRepository) {}

  async createShelter(
    req: Request<Record<string, string>, {}, CreateShelterDTO>,
    res: Response<ResponseAPI>
  ) {
    const {
      name,
      password,
      email,
      phone,
      address: addressDTO,
    } = req.body as CreateShelterDTO;
    const address = new AddressEntity(addressDTO.state, addressDTO.city);

    const shelter = new CreateShelterDTO(name, password, email, phone, address);

    const entityCreated = await this.repository.createShelter(
      ShelterMapper.toEntity(shelter)
    );

    if (entityCreated) {
      const model = ShelterMapper.toModel(entityCreated);
      res
        .status(HttpStatusCode.CREATED)
        .json(
          new ResponseAPI(
            "Shelter created",
            instanceToPlain(ShelterMapper.toResponse(model))
          )
        );
    }
  }

  async addPet(
    req: Request<Record<string, string>, {}, CreateShelterDTO>,
    res: Response<ResponseAPI>
  ) {
    const { petId, shelterId } = req.params;

    const entity = await this.repository.addPet(shelterId, petId);

    if (entity) {
      res
        .status(HttpStatusCode.OK)
        .json(new ResponseAPI("Pet added to shelter"));
    } else {
      throw new InternalServerError("Error adding pet to shelter");
    }
  }

  async getShelter(
    req: Request<Record<string, string>, {}, CreateShelterDTO>,
    res: Response<ResponseAPI>
  ) {
    const { id } = req.params;
    const entity = await this.repository.getShelter(id);

    if (entity) {
      const model = ShelterMapper.toModel(entity);
      res
        .status(HttpStatusCode.OK)
        .json(
          new ResponseAPI(
            "Shelter found",
            instanceToPlain(ShelterMapper.toResponse(model))
          )
        );
    } else {
      throw new NotFound("Shelter not found");
    }
  }

  async getAllShelters(
    req: Request<Record<string, string>, {}, {}, ShelterFilters>,
    res: Response<ResponseAPI>
  ) {
    const filters = req.query;
    const shelters = await this.repository.getAllShelters(filters);

    if (shelters.length == 0) {
      res
        .status(HttpStatusCode.NO_CONTENT)
        .json(new ResponseAPI("No shelters found"));
      return;
    }

    res.status(HttpStatusCode.OK).json(
      new ResponseAPI(
        "Shelters found",
        shelters.map((shelter) => {
          const model = ShelterMapper.toModel(shelter);
          return instanceToPlain(ShelterMapper.toResponse(model));
        })
      )
    );
  }

  async updateShelter(
    req: Request<Record<string, string>, {}, CreateShelterDTO>,
    res: Response<ResponseAPI>
  ) {
    const { id } = req.params;
    const {
      name,
      password,
      email,
      phone,
      address: addressDTO,
    } = req.body as CreateShelterDTO;
    const address = new AddressEntity(addressDTO.state, addressDTO.city);

    const shelter = new CreateShelterDTO(name, password, email, phone, address);

    const entityUpdated = await this.repository.updateShelter(
      id,
      ShelterMapper.toEntity(shelter)
    );

    if (entityUpdated) {
      const model = ShelterMapper.toModel(entityUpdated);
      res
        .status(HttpStatusCode.OK)
        .json(
          new ResponseAPI(
            "Shelter updated",
            instanceToPlain(ShelterMapper.toResponse(model))
          )
        );
    } else {
      throw new NotFound("Shelter not found");
    }
  }

  async deleteShelter(
    req: Request<Record<string, string>, {}, CreateShelterDTO>,
    res: Response<ResponseAPI>
  ) {
    const { id } = req.params;
    const shelterDeleted = await this.repository.deleteShelter(id);

    if (shelterDeleted) {
      res.status(HttpStatusCode.OK).json(new ResponseAPI("Shelter deleted"));
    } else {
      throw new NotFound("Shelter not found");
    }
  }
}
