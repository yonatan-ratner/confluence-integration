import { Request, Response } from "express";
import { getAllSpaces } from "../../services/spaceService";
import {
  AccessibleResourcesData,
  AccessToken,
} from "../../interfaces/vendors/atlassian/IAuth";
import { AuthService } from "../../services/authService";
import { SpacesResponse } from "../../interfaces/vendors/atlassian/ISpaces";
import getSpacesTemplate from "../../templates/spaces/spacesTemplate";

const authService: AuthService = AuthService.Instance();
class SpacesController {
  public static async serve(req: Request, res: Response) {
    const token: AccessToken | null = await authService.GetTokenOrRedirect(
      req,
      res
    );
    if (!token) return;

    const confluenceResource: AccessibleResourcesData | undefined =
      token.accessibleResources.find((r) =>
        r.scopes.includes("read:space:confluence")
      );

    if (!confluenceResource) {
      res.status(400).send("No Confluence resource found for user.");
      return;
    }

    const spaces: SpacesResponse = await getAllSpaces(
      token.data.access_token,
      confluenceResource.id
    );

    const html: string = getSpacesTemplate(spaces);
    res.send(html);
  }
}

export default SpacesController;
