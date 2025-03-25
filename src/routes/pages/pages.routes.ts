import { Router } from "express";
import pagesController from "../../controllers/pages/pages.controller";
import singlePageController from "../../controllers/pages/singlePage.controller";

const router: Router = Router();

/**
 * Serves the list of pages for a specific space.
 */
router.get("/:spaceId/pages", pagesController.serve);

/**
 * Serves a specific page within a space.
 */
router.get("/:spaceId/pages/:pageId", singlePageController.serve);

export default router;
