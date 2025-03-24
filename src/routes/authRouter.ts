import { AccessToken, AccessibleResourcesData, TokenData } from "models/IAuth";
import { Router } from "express";
import { AuthService } from "services/authService";

const router = Router()
const authService: AuthService = AuthService.Instance()

router.get('/auth/atlassian', (req, res) => {
    const uuid: string = req.session.uuid!
    const authUrl = authService.GetAuthorizationUrl(uuid)
    res.redirect(authUrl);
});

router.get('/auth/confluence/callback', async (req, res) => {
    const code: string = req.query.code as string;
    const returnEndpoint = req.session.returnUrl!

    try {
        const tokenData: TokenData = await authService.ExchangeCodeForToken(code)
        const cloudData: AccessibleResourcesData = await authService.GetAccessibleResources(tokenData.access_token)

        let token: AccessToken = {
            data: tokenData,
            accessibleResources: cloudData,
            creationDate: Math.floor(Date.now() / 1000)
        }

        req.session.token = token
        res.redirect(returnEndpoint)
    } catch (err: any) {
        console.error('OAuth error:', err.message);
        res.status(500).send('OAuth2 callback failed');
    }
});

export default router;