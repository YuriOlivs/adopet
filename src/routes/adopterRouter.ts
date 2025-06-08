import express from "express";
import AdopterController from "../controller/AdopterController";
import AdopterRepository from "../repository/Adopter/AdopterRepository";
import { AppDataSource } from "../config/dataSource";
import { adopterSchema } from "../domain/schemas/adopterSchema";
import { validateBody } from "../middleware/validators/validateBody";

const router = express.Router();
const adopterRepository = new AdopterRepository(AppDataSource.getRepository("AdopterEntity"));
const adopterController = new AdopterController(adopterRepository);

router.post("/", validateBody(adopterSchema), (req, res) => adopterController.createAdopter(req, res));
router.get("/", (req, res) => adopterController.getAllAdopters(req, res));
router.get("/:id", (req, res) => adopterController.getAdopter(req, res));
router.put("/:id", (req, res) => adopterController.updateAdopter(req, res));
router.delete("/:id", (req, res) => adopterController.deleteAdopter(req, res));
router.put("/address/:id", (req, res) => adopterController.updateAddress(req, res));

export default router;