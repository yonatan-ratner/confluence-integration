/**
 * Service for handling authentication with Atlassian OAuth2.0.
 * Manages token exchange, storage, and validation.
 */

import {
  AuthParams,
  TokenBody,
  TokenData,
  AccessToken,
  AccessibleResourcesData,
} from "../interfaces/vendors/atlassian/IAuth";
import { createUrlParamsFromCustomType } from "../utils/typeUtils";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

import dotenv from "dotenv";
dotenv.config();
const clientId: string = process.env.ATLASSIAN_CLIENT_ID!;
const clientSecret: string = process.env.ATLASSIAN_CLIENT_SECRET!;
const redirectUrl: string = process.env.ATLASSIAN_REDIRECT_URL!;

const scopes: string[] = ["read:page:confluence", "read:space:confluence"];

/**
 * Service class for handling Atlassian OAuth2.0 authentication.
 */
export class AuthService {
  private readonly authBaseUrl = "https://auth.atlassian.com";
  private readonly authUrl = `${this.authBaseUrl}/authorize`;
  private readonly tokenUrl = `${this.authBaseUrl}/oauth/token`;
  private readonly apiBaseUrl = "https://api.atlassian.com";
  private readonly accessibleResourcesUrl = `${this.apiBaseUrl}/oauth/token/accessible-resources`;

  private static instance: AuthService;

  /**
   * Returns the singleton instance of the AuthService.
   * @returns The AuthService instance.
   */
  public static Instance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Checks if the provided token is expired.
   * @param token - The access token to check.
   * @returns True if the token is expired, false otherwise.
   */
  protected isTokenExpired(token: AccessToken): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now > token.creationDate + token.data.expiresIn;
  }

  /**
   * Retrieves the token from the session or redirects to the authorization URL if the token is missing or expired.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns The access token or null if a redirect is performed.
   */
  public async GetTokenOrRedirect(
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<AccessToken | null> {
    const token = req.session.token;
    if (!token || this.isTokenExpired(token)) {
      req.session.returnUrl = req.originalUrl;
      const uuid = req.session.uuid!;
      const url = this.GetAuthorizationUrl(uuid);
      res.redirect(url);
      return null;
    }
    return token;
  }

  /**
   * Constructs the authorization URL for initiating the OAuth2.0 flow.
   * @param uuid - The unique identifier for the session.
   * @returns The authorization URL.
   */
  GetAuthorizationUrl(uuid: string): string {
    const params: AuthParams = {
      audience: "api.atlassian.com",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: redirectUrl,
      state: uuid,
      response_type: "code",
      prompt: "consent",
    };

    const query = createUrlParamsFromCustomType(params);
    return `${this.authUrl}?${query}`;
  }

  /**
   * Exchanges the authorization code for an access token.
   * @param code - The authorization code received from the OAuth2.0 flow.
   * @returns The token data.
   * @throws An error if the token exchange fails.
   */
  async ExchangeCodeForToken(code: string): Promise<TokenData> {
    const body: TokenBody = {
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUrl,
    };

    const response: Response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Token exchange failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Retrieves the accessible resources for the provided access token.
   * @param accessToken - The access token.
   * @returns The list of accessible resources.
   * @throws An error if the fetch fails.
   */
  async GetAccessibleResources(
    accessToken: string
  ): Promise<AccessibleResourcesData[]> {
    const response: Response = await fetch(this.accessibleResourcesUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Cloud ID fetch failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }
}
