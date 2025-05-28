import { DataSource } from "typeorm";
import PetEntity from "../domain/entities/PetEntity";
import AdopterEntity from "../domain/entities/AdopterEntity";
import AddressEntity from "../domain/entities/AddressEntity";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/db.sqlite",
   entities: [PetEntity, AdopterEntity, AddressEntity],
   synchronize: true
})