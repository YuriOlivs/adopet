import express from "express";
import petRouter from "./petRouter";
import adopterRouter from "./adopterRouter";

const router = (app: express.Router) => {
   app.use("/pets", petRouter);
   app.use("/adopters", adopterRouter);
};

export default router;
