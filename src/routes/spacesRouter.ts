import { Router } from 'express'
import { getAllSpaces } from '../services/spaceService'
import { AccessToken } from '../models/IAuth'
import { AuthService } from '../services/authService'
import { SpacesResponse } from '../models/ISpaces'

const router = Router()
const authService = AuthService.Instance()

router.get('/', async (req, res) => {
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

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Spaces</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            padding: 40px;
            text-align: center;
            }
            h1 {
            color: #333;
            }
            .space {
            margin-bottom: 20px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            }
            .btn {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #0052cc;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            }
            .btn:hover {
            background-color: #0065ff;
            }
            a.back {
            display: inline-block;
            margin-bottom: 30px;
            color: #0052cc;
            text-decoration: none;
            }
        </style>
        </head>
        <body>
        <a class="back" href="/">⬅ Back</a>
        <h1>Spaces</h1>
        ${spaces.results.map(space => `
            <div class="space">
            <h3>${space.name}</h3>
            <a class="btn" href="/pages?spaceId=${space.id}">See pages in space</a>
            </div>
        `).join('')}
        </body>
        </html>
        `

    res.send(html)
})

export default router