import { Router } from "express";
import pagesController from "../../controllers/pages/pages.controller";
import singlePageController from "../../controllers/pages/singlePage.controller";

const router: Router = Router();

router.get("/:spaceId/pages", pagesController.serve);

router.get("/:spaceId/pages/:pageId", singlePageController.serve);

export default router;
