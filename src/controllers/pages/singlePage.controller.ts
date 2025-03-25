import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import { AccessToken } from "../../interfaces/vendors/atlassian/IAuth";
import { getPageById } from "../../services/pageService";
import getSinglePageTemplate from "../../templates/pages/singlePageTemplate";

const authService: AuthService = AuthService.Instance();

class singlePageController {
  public static async serve(req: Request, res: Response) {
    const spaceId: string = req.params.spaceId;
    const pageId: string = req.params.pageId;

    if (!pageId) {
      res.status(400).send("Missing page ID");
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
      res.status(400).send("No Confluence resource found");
      return;
    }

    const accessToken = token.data.access_token;
    const cloudId = confluenceResource.id;
    const page = await getPageById(accessToken, cloudId, pageId);

    const html = getSinglePageTemplate(
      page.title,
      spaceId,
      JSON.stringify(page.body)
    );
    res.send(html);
  }
}

export default singlePageController;
