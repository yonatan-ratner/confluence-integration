/**
 * Controller for handling page-related routes.
 * Fetches and renders pages within a Confluence space.
 */

import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import { AccessToken } from "../../interfaces/vendors/atlassian/IAuth";
import { getPagesInSpace } from "../../services/pageService";
import getAllPagesTemplate from "../../templates/pages/pagesTemplate";
import { PagesResponse } from "../../interfaces/vendors/atlassian/IPages";

const authService: AuthService = AuthService.Instance();

/**
 * Controller for handling page-related routes.
 * Fetches and renders pages within a Confluence space.
 */
class pagesController {
  /**
   * Serves the pages within a Confluence space.
   *
   * @param {Request} req - The request object containing the spaceId parameter.
   * @param {Response} res - The response object used to send the HTML content or error messages.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public static async serve(req: Request, res: Response): Promise<void> {
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
