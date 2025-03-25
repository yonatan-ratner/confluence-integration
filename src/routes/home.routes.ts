import { Router } from "express";
import homeController from "../controllers/home.controller";

const router = Router();

router.get("/", homeController.serve);

export default router;
