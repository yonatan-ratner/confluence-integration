import { Router } from "express";
import authController from "../../controllers/auth/auth.controller";

const router = Router();

//This might be redundant but it allows initiating the flow via REST only
router.get("/auth/atlassian", authController.serve);

router.get("/auth/confluence/callback", authController.callback);

export default router;
