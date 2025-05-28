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

export default class AdopterController {
   constructor(private repository: AdopterRepository) { }

   async createAdopter(req: Request, res: Response) {
      try {
         const { name, email, password, address: addressDTO, photo } = req.body as CreateAdopterDTO;
         const address = addressDTO ? new Address(uuid(), addressDTO.state, addressDTO.city) : undefined;

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
            res.status(201).json(instanceToPlain(AdopterMapper.toResponse(model)));
         }
      } catch (err) {
         res.status(500).json({ message: "Error creating adopter" });
         return;
      }
   }

   async getAdopter(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const entity = await this.repository.getAdopter(id);
         if (entity) {
            const model = AdopterMapper.toModel(entity);
            res.status(200).json(instanceToPlain(AdopterMapper.toResponse(model)));
         }
         else {
            res.status(404).json({ message: "Adopter not found" });
         }
      }
      catch (err) {
         res.status(500).json({ message: "Error getting adopter" });
      }
   }

   async updateAdopter(req: Request, res: Response) {
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
            res.status(200).json(instanceToPlain(AdopterMapper.toResponse(model)));
         }
         else {
            res.status(404).json({ message: "Adopter not found" });
         }
      }
      catch (err) {
         res.status(500).json({ message: "Error updating adopter" });
      }
   }

   async updateAddress(req: Request, res: Response) {
      try {
         const { city, state } = req.body as CreateAddressDTO;
         const { id } = req.params;

         const address = new AddressEntity(state, city);

         const entityUpdated = await this.repository.updateAddress(id, address);
         if (entityUpdated) {
            const model = AdopterMapper.toModel(entityUpdated);
            res.status(200).json(instanceToPlain(AdopterMapper.toResponse(model)));
         }
         else {
            res.status(404).json({ message: "Adopter not found" });
         }
      }
      catch (err) {
         res.status(500).json({ message: "Error updating adopter address" });
      }
   }

   async deleteAdopter(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const adopterDeleted = await this.repository.deleteAdopter(id);
         if (adopterDeleted) {
            res.status(200).json({ message: "Adopter deleted" });
         }
         else {
            res.status(404).json({ message: "Adopter not found" });
         }
      }
      catch (err) {
         res.status(500).json({ message: "Error deleting adopter" });
      }
   }
}