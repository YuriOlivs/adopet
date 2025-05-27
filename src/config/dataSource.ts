import { DataSource } from "typeorm";
import PetEntity from "../domain/entities/PetEntity";
import AdopterEntity from "../domain/entities/AdopterEntity";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/db.sqlite",
   entities: [PetEntity, AdopterEntity],
   synchronize: true
})