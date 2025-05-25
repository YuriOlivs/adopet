import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdopterEntity from "../entities/AdopterEntity";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/database.sqlite",
   entities: [PetEntity, AdopterEntity],
   synchronize: true
})