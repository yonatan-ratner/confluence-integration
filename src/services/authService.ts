/*
https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/#implementing-oauth-2-0--3lo-
*/

import { AuthParams, TokenBody, TokenData, AccessToken, AccessibleResourcesData } from 'models/IAuth';
import { jsonToQuery } from '../utils/query_utils';

const clientId: string = process.env.ATLASSIAN_CLIENT_ID!;
const clientSecret: string = process.env.ATLASSIAN_CLIENT_SECRET!;
const redirectUri: string = process.env.ATLASSIAN_REDIRECT_URI!;

console.log("CID = "+clientId)
console.log("CS = "+clientSecret)
console.log("REDIRECT = "+redirectUri)

// TODO: read scopes from .json? other 'maintainable' solution?
const scopes: string[] = [
    'read:page:confluence'
];

// TODO: refresh token
export class AuthService {
    private readonly baseUrl = "https://auth.atlassian.com"
    private readonly authBaseUrl = `${this.baseUrl}/authorize`
    private readonly tokenUrl = `${this.authBaseUrl}/oauth/token`;
    private readonly accessibleResourcesUrl = `${this.tokenUrl}/accessible-resources`

    private static instance: AuthService;
    public static Instance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private isTokenExpired(token: AccessToken): boolean {
        const now = Math.floor(Date.now() / 1000);
        return now > token.creationDate + token.data.expires_in;
    }

    public async GetTokenOrRedirect(req: any, res: any): Promise<AccessToken | null> {
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

    GetAuthorizationUrl(uuid: string): string {
        const params: AuthParams = {
            audience: 'api.atlassian.com',
            client_id: clientId,
            scope: scopes.join(' '),
            redirect_uri: redirectUri,
            state: uuid,
            response_type: 'code',
            prompt: 'consent',
        };

        const query = jsonToQuery(params);
        return `${this.authBaseUrl}?${query}`;
    }

    async ExchangeCodeForToken(code: string): Promise<TokenData> {
        const body: TokenBody = {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
        };

        const response: Response = await fetch(this.tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Token exchange failed: ${JSON.stringify(error)}`);
        }

        return response.json();
    }

    async GetAccessibleResources(accessToken: string): Promise<AccessibleResourcesData> {
        const response: Response = await fetch(this.accessibleResourcesUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Cloud ID fetch failed: ${JSON.stringify(error)}`);
        }

        return response.json();
    }
}


