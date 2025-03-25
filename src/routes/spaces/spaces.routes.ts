import { Router } from "express";
import SpacesController from "../../controllers/spaces/spaces.controller";

const router = Router();

router.get("/spaces", SpacesController.serve);

export default router;
