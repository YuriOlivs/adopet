import express from "express";
import ShelterController from "../controller/ShelterController";
import ShelterRepository from "../repository/Shelter/ShelterRepository";
import { AppDataSource } from "../config/dataSource";
import { shelterSchema } from "../domain/schemas/shelterSchema";
import { validateBody } from "../middleware/validators/validateBody";

const router = express.Router();
const shelterRepository = new ShelterRepository(
   AppDataSource.getRepository("ShelterEntity"),
   AppDataSource.getRepository("PetEntity")
);
const shelterController = new ShelterController(shelterRepository);

router.post(
   "/", 
   validateBody(shelterSchema), 
   (req, res) => shelterController.createShelter(req, res)
);
router.get("/", (req, res) => shelterController.getAllShelters(req, res));
router.get("/:id", (req, res) => shelterController.getShelter(req, res));
router.put("/:id", (req, res) => shelterController.updateShelter(req, res));
router.delete("/:id", (req, res) => shelterController.deleteShelter(req, res));
router.put("/add-pet/:shelterId/:petId", (req, res) => shelterController.addPet(req, res));

export default router;
