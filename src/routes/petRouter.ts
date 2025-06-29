
import express from "express";
import PetController from "../controller/PetController";
import PetRepostiory from "../repository/Pet/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { validateBody} from "../middleware/validators/validateBody";
import { createPetSchema, petListSchema } from "../domain/schemas/petSchema";

const router = express.Router();
const petRepository = new PetRepostiory(
   AppDataSource.getRepository("PetEntity"),
   AppDataSource.getRepository("AdopterEntity"),
   AppDataSource.getRepository("ShelterEntity")
);
const petController = new PetController(petRepository);

router.post(
   "/", 
   validateBody(createPetSchema), 
   (req, res) => petController.createPet(req, res)
);

router.post(
   "/batch", 
   validateBody(petListSchema), 
   (req, res) => petController.createPetsBatch(req, res)
);

router.put("/:id", (req, res) => petController.updatePet(req, res));

router.put("/adopt/:petId/:adopterId", (req, res) => petController.adoptPet(req, res));

router.get("/", (req, res) => petController.getAllPets(req, res));

router.get("/:id", (req, res) => petController.getPet(req, res));

router.get("/by-shelter/:id", (req, res) => petController.getPetsByShelter(req, res));

router.delete("/:id", (req, res) => petController.deletePet(req, res));

export default router;

