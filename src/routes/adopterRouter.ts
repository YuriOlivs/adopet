import express from "express";
import AdopterController from "../controller/AdopterController";
import AdopterRepository from "../repository/Adopter/AdopterRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adopterRepository = new AdopterRepository(AppDataSource.getRepository("AdopterEntity"));
const adopterController = new AdopterController(adopterRepository);

router.post("/", (req, res) => adopterController.createAdopter(req, res));
router.get("/:id", (req, res) => adopterController.getAdopter(req, res));
router.put("/:id", (req, res) => adopterController.updateAdopter(req, res));
router.delete("/:id", (req, res) => adopterController.deleteAdopter(req, res));

export default router;