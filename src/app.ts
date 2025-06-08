import "express-async-errors"
import "reflect-metadata";
import express from "express";
import router from "./routes";
import { AppDataSource } from "./config/dataSource";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(express.json());
router(app);

app.use(errorMiddleware)

AppDataSource.initialize()
   .then(() => {
      console.log("Database connected");
   })
   .catch((error) => console.log(error));

export default app;
