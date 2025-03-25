import { AccessToken, AccessibleResourcesData, TokenData } from "../models/IAuth"
import { Router, Request, Response } from "express"
import { AuthService } from "../services/authService"

const router = Router()
const authService: AuthService = AuthService.Instance()

//This might be redundant but it allows initiating the flow via REST only
router.get('/auth/atlassian', (req: Request, res: Response) => {
    const uuid: string = req.session.uuid!
    const authUrl = authService.GetAuthorizationUrl(uuid)
    res.redirect(authUrl)
})

router.get('/auth/confluence/callback', async (req, res) => {
    const code: string = req.query.code as string
    const returnEndpoint = req.session.returnUrl!

    try {
        const tokenData: TokenData = await authService.ExchangeCodeForToken(code)
        const cloudData: AccessibleResourcesData[] = await authService.GetAccessibleResources(tokenData.accessToken)

        const token: AccessToken = {
            data: tokenData,
            accessibleResources: cloudData,
            creationDate: Math.floor(Date.now() / 1000)
        }

        req.session.token = token
        res.redirect(returnEndpoint)
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('OAuth error:', message)
        res.status(500).send('OAuth2 callback failed')
    }
})

export default router