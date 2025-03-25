import { Router } from "express";
import SpacesController from "../../controllers/spaces/spaces.controller";

const router = Router();

/**
 * Serves the list of Confluence spaces.
 */
router.get("/spaces", SpacesController.serve);

export default router;
