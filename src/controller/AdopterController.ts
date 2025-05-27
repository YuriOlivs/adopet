import { Request, Response } from "express";
import AdopterRepository from "../repository/Adopter/AdopterRepository";
import { v4 as uuid } from "uuid";
import Adopter from "../domain/entities/Adopter/Adopter";
import { instanceToPlain } from "class-transformer";
import { CreateAdopterDTO } from "../domain/entities/Adopter/CreateAdopterDTO";

export default class AdopterController {
   constructor(private repository: AdopterRepository) { }

   async createAdopter(req: Request, res: Response) {
      try {
         const { name, email, password, address, photo } = req.body as CreateAdopterDTO;

         const adopter = new Adopter(
            uuid(),
            name,
            email,
            password,
            address,
            photo
         );

         const adopterCreated = await this.repository.createAdopter(adopter.toEntity());
         if (adopterCreated) {
            res.status(201).json(instanceToPlain(adopterCreated));
         }
      } catch (err) {
         res.status(500).json({ message: "Error creating adopter" });
         return;
      }
   }

   async getAdopter(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const adopter = await this.repository.getAdopter(id);
         if (adopter) {
            res.status(200).json(instanceToPlain(adopter));
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
            address,
            photo
         );

         const adopterUpdated = await this.repository.updateAdopter(id, adopter.toEntity());
         if (adopterUpdated) {
            res.status(200).json(instanceToPlain(adopterUpdated));
         }
         else {
            res.status(404).json({ message: "Adopter not found" });
         }
      }
      catch (err) {
         res.status(500).json({ message: "Error updating adopter" });
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