import { Router } from "express";
import authController from "../../controllers/auth/auth.controller";

const router = Router();

/**
 * Initiates the authentication flow via REST.
 */
router.get("/auth/atlassian", authController.serve);

/**
 * Handles the callback from Confluence authentication.
 */
router.get("/auth/confluence/callback", authController.callback);

export default router;
