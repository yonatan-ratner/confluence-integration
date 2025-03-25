import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import { AccessToken } from "../../interfaces/vendors/atlassian/IAuth";
import { getPageById } from "../../services/pageService";
import getSinglePageTemplate from "../../templates/pages/singlePageTemplate";
import { PageData } from "../../interfaces/vendors/atlassian/IPages";

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

    const accessToken: string = token.data.access_token;
    const cloudId: string = confluenceResource.id;
    const page: PageData = await getPageById(accessToken, cloudId, pageId);

    const html: string = getSinglePageTemplate(
      page.title,
      spaceId,
      JSON.stringify(page.body)
    );
    res.send(html);
  }
}

export default singlePageController;
