import { Request, Response } from "express";
import AdopterRepository from "../repository/Adopter/AdopterRepository";
import { v4 as uuid } from "uuid";
import Adopter from "../domain/models/Adopter/Adopter";
import { instanceToPlain } from "class-transformer";
import CreateAdopterDTO from "../domain/models/Adopter/CreateAdopterDTO";
import AdopterMapper from "../domain/mappers/AdopterMapper";
import Address from "../domain/models/Address/Address";
import AdopterEntity from "../domain/entities/AdopterEntity";
import { CreateAddressDTO } from "../domain/models/Address/CreateAddressDTO";
import AddressEntity from "../domain/entities/AddressEntity";
import ResponseAPI from "../domain/models/ResponseAPI";

export default class AdopterController {
   constructor(private repository: AdopterRepository) { }

   async createAdopter(
      req: Request<Record<string, string>, {}, CreateAdopterDTO>, 
      res: Response<ResponseAPI>
   ) { 
      try {
         const { name, email, password, address: addressDTO, photo } = req.body as CreateAdopterDTO;

         const address = addressDTO 
            ? new Address(uuid(), addressDTO.state, addressDTO.city) 
            : undefined;

         const adopter = new CreateAdopterDTO(
            name,
            email,
            password,
            photo,
            address
         );

         const entityCreated = await this.repository.createAdopter(AdopterMapper.toEntity(adopter));
         if (entityCreated) {
            const model = AdopterMapper.toModel(entityCreated);
            res.status(201).json(new ResponseAPI("Adopter created", instanceToPlain(AdopterMapper.toResponse(model))));
         }
      } catch (err) {
         res.status(500).json(new ResponseAPI("Error creating adopter", err));
         return;
      }
   }

   async getAdopter(
      req: Request<Record<string, string>, {}, CreateAdopterDTO>, 
      res: Response<ResponseAPI>
   ) {
      try {
         const { id } = req.params;
         const entity = await this.repository.getAdopter(id);
         if (entity) {
            const model = AdopterMapper.toModel(entity);
            res.status(200).json(new ResponseAPI("Adopter found", instanceToPlain(AdopterMapper.toResponse(model))));
         }
         else {
            res.status(404).json(new ResponseAPI("Adopter not found"));
         }
      }
      catch (err) {
         res.status(500).json(new ResponseAPI("Error getting adopter", err));
      }
   }

   async getAllAdopters(
      req: Request<Record<string, string>, {}, CreateAdopterDTO>, 
      res: Response<ResponseAPI>
   ) {
      try {
         const entities = await this.repository.getAllAdopters();
         const models = entities.map((entity) => AdopterMapper.toModel(entity));
         res.status(200).json(new ResponseAPI("Adopters found", models.map((model) => instanceToPlain(AdopterMapper.toResponse(model)))));
      }
      catch (err) {
         res.status(500).json(new ResponseAPI("Error getting adopters", err));
      }
   }

   async updateAdopter(
      req: Request<Record<string, string>, {}, CreateAdopterDTO>, 
      res: Response<ResponseAPI>
   ) {
      try {
         const { name, email, password, address, photo } = req.body as Adopter;
         const { id } = req.params;

         const adopter = new Adopter(
            id,
            name,
            email,
            password,
            photo ?? undefined,
            address ?? undefined
         );

         const entityUpdated = await this.repository.updateAdopter(id, AdopterMapper.toEntity(adopter) as AdopterEntity);
         if (entityUpdated) {
            const model = AdopterMapper.toModel(entityUpdated);
            res.status(200).json(new ResponseAPI("Adopter updated", instanceToPlain(AdopterMapper.toResponse(model))));
         }
         else {
            res.status(404).json(new ResponseAPI("Adopter not found"));
         }
      }
      catch (err) {
         res.status(500).json(new ResponseAPI("Error updating adopter", err));
      }
   }

   async updateAddress(
      req: Request<Record<string, string>, {}, CreateAddressDTO>, 
      res: Response<ResponseAPI>
   ) {
      try {
         const { city, state } = req.body as CreateAddressDTO;
         const { id } = req.params;

         const address = new AddressEntity(state, city);

         const entityUpdated = await this.repository.updateAddress(id, address);
         if (entityUpdated) {
            const model = AdopterMapper.toModel(entityUpdated);
            res.status(200).json(new ResponseAPI("Adopter address updated", instanceToPlain(AdopterMapper.toResponse(model))));
         }
         else {
            res.status(404).json(new ResponseAPI("Adopter not found"));
         }
      }
      catch (err) {
         res.status(500).json(new ResponseAPI("Error updating adopter address", err));
      }
   }

   async deleteAdopter(
      req: Request<Record<string, string>, {}, CreateAdopterDTO>, 
      res: Response<ResponseAPI>
   ) {
      try {
         const { id } = req.params;

         const adopterDeleted = await this.repository.deleteAdopter(id);
         if (adopterDeleted) {
            res.status(200).json(new ResponseAPI("Adopter deleted"));
         }
         else {
            res.status(404).json(new ResponseAPI("Adopter not found"));
         }
      }
      catch (err) {
         res.status(500).json(new ResponseAPI("Error deleting adopter", err));
      }
   }
}

