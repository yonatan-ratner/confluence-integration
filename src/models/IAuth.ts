// TODO IF TIME:  move to camelCase...

export interface AuthParams {
    audience: string,
    clientId: string,
    scope: string,
    redirectUri: string,
    state: string,
    responseType: string,
    prompt: string,
}

export interface TokenBody {
    grantType: string,
    clientId: string,
    clientSecret: string,
    code: string, // Set this to the authorization code received from the initial authorize call
    redirectUri: string,
}

export interface TokenData {
    accessToken: string,
    expiresIn: number,
    scope: string
}

export interface AccessibleResourcesData {
    id: string,
    name: string,
    url: string,
    scopes: string[],
    avatarUrl: string
}

export interface AccessToken {
    data: TokenData,
    accessibleResources: AccessibleResourcesData[],
    creationDate: number
}