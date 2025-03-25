import { Router } from "express";
import homeController from "../controllers/home.controller";

const router = Router();

/**
 * Serves the home page.
 */
router.get("/", homeController.serve);

export default router;
