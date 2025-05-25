import { Request, Response } from "express";
import AdopterRepository from "../repository/Adopter/AdopterRepository";
import { v4 as uuid } from "uuid";
import Adopter from "../domain/Adopter/Adopter";
import { instanceToPlain } from "class-transformer";

export default class AdopterController {
   constructor(private repository: AdopterRepository) {}

   async createAdopter(req: Request, res: Response) {
      try {
         const { name, email, password, address, photo } = req.body;

         const adopter = new Adopter(
            uuid(),
            name, 
            email,
            password,
            address,
            photo
         );

         const adopterCreated = await this.repository.createAdopter(adopter.toEntity());
         if(adopterCreated) {
            res.status(201).json(instanceToPlain(adopterCreated));
         }
      } catch (err) {
         res.status(500).json({ message: "Error creating adopter" });
         return;
      }
   }
}