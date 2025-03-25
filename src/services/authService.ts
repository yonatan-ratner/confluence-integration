/**
https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/#implementing-oauth-2-0--3lo-
*/

import { AuthParams, TokenBody, TokenData, AccessToken, AccessibleResourcesData } from '../models/IAuth'
import { createUrlParamsFromCustomType } from '../utils/typeUtils'
import {Request as ExpressRequest, Response as ExpressResponse} from 'express'

import dotenv from 'dotenv'
dotenv.config()
const clientId: string = process.env.ATLASSIAN_CLIENT_ID!
const clientSecret: string = process.env.ATLASSIAN_CLIENT_SECRET!
const redirectUrl: string = process.env.ATLASSIAN_REDIRECT_URL!

// TODO: read scopes from .json? other 'maintainable' solution?
const scopes: string[] = [
    'read:page:confluence',
    'read:space:confluence',
]

// TODO: refresh token
export class AuthService {
    private readonly authBaseUrl = "https://auth.atlassian.com"
    private readonly authUrl = `${this.authBaseUrl}/authorize`
    private readonly tokenUrl = `${this.authBaseUrl}/oauth/token`
    private readonly apiBaseUrl = "https://api.atlassian.com"
    private readonly accessibleResourcesUrl = `${this.apiBaseUrl}/oauth/token/accessible-resources`

    private static instance: AuthService
    public static Instance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService()
        }
        return AuthService.instance
    }

    protected isTokenExpired(token: AccessToken): boolean {
        const now = Math.floor(Date.now() / 1000)
        return now > token.creationDate + token.data.expires_in
    }

    public async GetTokenOrRedirect(req: ExpressRequest, res: ExpressResponse): Promise<AccessToken | null> {
        const token = req.session.token
        if (!token || this.isTokenExpired(token)) {
            req.session.returnUrl = req.originalUrl
            const uuid = req.session.uuid!
            const url = this.GetAuthorizationUrl(uuid)
            res.redirect(url)
            return null
        }
        return token
    }

    GetAuthorizationUrl(uuid: string): string {
        const params: AuthParams = {
            audience: 'api.atlassian.com',
            client_id: clientId,
            scope: scopes.join(' '),
            redirect_uri: redirectUrl,
            state: uuid,
            response_type: 'code',
            prompt: 'consent',
        }
        
        const query = createUrlParamsFromCustomType(params)
        return `${this.authUrl}?${query}`
    }

    async ExchangeCodeForToken(code: string): Promise<TokenData> {
        const body: TokenBody = {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUrl,
        }

        const response: Response = await fetch(this.tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Token exchange failed: ${JSON.stringify(error)}`)
        }

        return response.json()
    }

    async GetAccessibleResources(accessToken: string): Promise<AccessibleResourcesData[]> {
        const response: Response = await fetch(this.accessibleResourcesUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Cloud ID fetch failed: ${JSON.stringify(error)}`)
        }

        return response.json()
    }
}


