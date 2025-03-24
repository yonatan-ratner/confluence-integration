// TODO IF TIME:  move to camelCase...

export interface AuthParams {
    audience: string,
    client_id: string,
    scope: string,
    redirect_uri: string,
    state: string,
    response_type: string,
    prompt: string,
}

export interface TokenBody {
    grant_type: string,
    client_id: string,
    client_secret: string,
    code: string, // Set this to the authorization code received from the initial authorize call
    redirect_uri: string,
}

export interface TokenData {
    access_token: string,
    expires_in: number,
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
    accessibleResources: AccessibleResourcesData,
    creationDate: number
}