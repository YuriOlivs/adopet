import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./src/config/db.sqlite",
   entities: [path.resolve(__dirname, "../domain/entities/*.ts")],
   synchronize: true
})