import { Router } from 'express'
import { getAllSpaces } from '../services/spaceService'
import { AccessToken } from '../models/IAuth'
import { AuthService } from '../services/authService'
import { SpacesResponse } from '../models/ISpaces'
import getSpacesTemplate from '../templates/spacesTemplate'

const router = Router()
const authService = AuthService.Instance()

router.get('/spaces', async (req, res) => {
    const token: AccessToken | null = await authService.GetTokenOrRedirect(req, res)
    if (!token) return

    const confluenceResource = token.accessibleResources.find(
        (r) => r.scopes.includes('read:space:confluence')
    )

    if (!confluenceResource) {
        res.status(400).send("No Confluence resource found for user.")
        return
    }

    const spaces: SpacesResponse = await getAllSpaces(token.data.access_token, confluenceResource.id)

    const html = getSpacesTemplate(spaces)
    res.send(html)
})

export default router