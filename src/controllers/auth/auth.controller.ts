import { Request, Response } from "express";
import { AuthService } from "../../services/authService";
import {
  AccessToken,
  AccessibleResourcesData,
  TokenData,
} from "../../interfaces/vendors/IAuth";

const authService: AuthService = AuthService.Instance();

class authController {
  public static async serve(req: Request, res: Response) {
    const uuid: string = req.session.uuid!;
    const authUrl = authService.GetAuthorizationUrl(uuid);
    res.redirect(authUrl);
  }

  public static async callback(req: Request, res: Response) {
    const code: string = req.query.code as string;
    const returnEndpoint = req.session.returnUrl!;

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
      const message = err instanceof Error ? err.message : String(err);
      console.error("OAuth error:", message);
      res.status(500).send("OAuth2 callback failed");
    }
  }
}

export default authController;
