import { Router } from 'express'
import { AccessToken } from '../models/IAuth'
import { AuthService } from '../services/authService'
import { getPageById, getPagesInSpace } from '../services/pageService'

const router = Router()
const authService = AuthService.Instance()

router.get('/', async (req, res) => {
    const { spaceId, pageId } = req.query

    const token: AccessToken | null = await authService.GetTokenOrRedirect(req, res)
    if (!token) return

    const confluenceResource = token.accessibleResources.find(
        (r) => r.scopes.includes('read:page:confluence')
    )

    if (!confluenceResource) {
        res.status(400).send("No Confluence resource found.")
        return
    }

    const accessToken = token.data.access_token
    const cloudId = confluenceResource.id

    // If Page ID is present — show single page view
    if (pageId) {
        const page = await getPageById(accessToken, cloudId, String(pageId))
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${page.title}</title>
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
                .content {
                background: white;
                border-radius: 10px;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                text-align: left;
                white-space: pre-wrap;
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
            <a class="back" href="/spaces">⬅ Back to Spaces</a>
            <h1>${page.title}</h1>
            <div class="content">
                ${JSON.stringify(page.body, null, 2)}
            </div>
            </body>
            </html>
            `
        res.send(html)
    }

    // Else show pages in a space
    if (spaceId) {
        const pages = await getPagesInSpace(accessToken, cloudId, String(spaceId))

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pages in Space</title>
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
                .page {
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
            <a class="back" href="/spaces">⬅ Back to Spaces</a>
            <h1>Pages in Space: ${spaceId}</h1>
            ${pages.results.map(page => `
                <div class="page">
                <h3>${page.title}</h3>
                <a class="btn" href="/pages?pageId=${page.id}">View Page Content</a>
                </div>
            `).join('')}
            </body>
            </html>
            `
        res.send(html)
    }

    res.status(400).send("Missing required query param: spaceId or pageId")
})

export default router
