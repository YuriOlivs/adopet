import { DataSource } from "typeorm";
import AdopterEntity from "../domain/entities/AdopterEntity";
import PetEntity from "../domain/entities/PetEntity";
import ShelterEntity from "../domain/entities/ShelterEntity";
import AddressEntity from "../domain/entities/AddressEntity";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/db.sqlite",
   entities: [AdopterEntity, PetEntity, ShelterEntity, AddressEntity],
   synchronize: true
})