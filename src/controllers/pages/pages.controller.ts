import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import {
  AccessibleResourcesData,
  AccessToken,
} from "../../interfaces/vendors/atlassian/IAuth";
import { getPagesInSpace } from "../../services/pageService";
import getAllPagesTemplate from "../../templates/pages/pagesTemplate";
import { PagesResponse } from "../../interfaces/vendors/atlassian/IPages";

const authService: AuthService = AuthService.Instance();

class pagesController {
  public static async serve(req: Request, res: Response) {
    const spaceId: string = req.params.spaceId;

    if (!spaceId) {
      res.status(400).send("Missing spaceId");
      return;
    }

    const token: AccessToken | null = await authService.GetTokenOrRedirect(
      req,
      res
    );
    if (!token) {
      return;
    }

    const confluenceResource = token.accessibleResources.find((r) =>
      r.scopes.includes("read:page:confluence")
    );

    if (!confluenceResource) {
      res.status(400).send("No Confluence resource found.");
      return;
    }

    const accessToken: string = token.data.access_token;
    const cloudId: string = confluenceResource.id;
    const pages: PagesResponse = await getPagesInSpace(
      accessToken,
      cloudId,
      String(spaceId)
    );

    const html = getAllPagesTemplate(pages, spaceId);
    res.send(html);
  }
}

export default pagesController;
