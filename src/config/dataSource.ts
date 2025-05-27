import { DataSource } from "typeorm";
import PetEntity from "../domain/entities/Pet/PetEntity";
import AdopterEntity from "../domain/entities/Adopter/AdopterEntity";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/db.sqlite",
   entities: [PetEntity, AdopterEntity],
   synchronize: true
})