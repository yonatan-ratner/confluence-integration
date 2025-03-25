/**
 * Controller for handling authentication routes.
 * Manages OAuth2.0 authorization and token exchange.
 */

import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import {
  AccessToken,
  AccessibleResourcesData,
  TokenData,
} from "../../interfaces/vendors/atlassian/IAuth";

const authService: AuthService = AuthService.Instance();

/**
 * Controller for handling authentication routes.
 * Manages OAuth2.0 authorization and token exchange.
 */
class authController {
  /**
   * Redirects to the Atlassian authorization URL.
   *
   * @param {Request} req - The request object containing the session UUID.
   * @param {Response} res - The response object used to redirect to the authorization URL.
   * @returns {Promise<void>} - A promise that resolves when the redirection is complete.
   */
  public static async serve(req: Request, res: Response): Promise<void> {
    const uuid: string = req.session.uuid!;
    const authUrl: string = authService.GetAuthorizationUrl(uuid);
    res.redirect(authUrl);
  }

  /**
   * Handles the OAuth2.0 callback and exchanges the code for a token.
   *
   * @param {Request} req - The request object containing the authorization code.
   * @param {Response} res - The response object used to redirect to the return endpoint or send an error message.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public static async callback(req: Request, res: Response): Promise<void> {
    const code: string = req.query.code as string;
    const returnEndpoint: string = req.session.returnUrl!;

    try {
      const tokenData: TokenData = await authService.ExchangeCodeForToken(code);
      const cloudData: AccessibleResourcesData[] =
        await authService.GetAccessibleResources(tokenData.access_token);

      const token: AccessToken = {
        data: tokenData,
        accessibleResources: cloudData,
        creationDate: Math.floor(Date.now() / 1000),
      };

      req.session.token = token;
      res.redirect(returnEndpoint);
    } catch (err: unknown) {
      const message: string = err instanceof Error ? err.message : String(err);
      console.error("OAuth error:", message);
      res.status(500).send("OAuth2 callback failed");
    }
  }
}

export default authController;
