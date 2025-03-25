import { Router, Request, Response } from "express"
import { AccessToken } from '../models/IAuth'
import { AuthService } from '../services/authService'
import { getPageById, getPagesInSpace } from '../services/pageService'
import getAllPagesTemplate from '../templates/pagesTemplate'
import getSinglePageTemplate from '../templates/singlePageTemplate'
import { PagesResponse } from "../models/IPages"


const router: Router = Router()
const authService: AuthService = AuthService.Instance()

router.get('/:spaceId/pages', async (req: Request, res: Response) => {
  const spaceId: string = req.params.spaceId

  if (!spaceId) {
    res.status(400).send('Missing spaceId')
    return
  }

  const token: AccessToken | null = await authService.GetTokenOrRedirect(req, res)
  if (!token) {
    return
  }

  const confluenceResource = token.accessibleResources.find(
    r => r.scopes.includes('read:page:confluence')
  )

  if (!confluenceResource) {
    res.status(400).send("No Confluence resource found.")
    return
  }

  const accessToken: string = token.data.accessToken
  const cloudId: string = confluenceResource.id
  const pages: PagesResponse = await getPagesInSpace(accessToken, cloudId, String(spaceId))

  const html = getAllPagesTemplate(pages, spaceId)
  res.send(html)
})

router.get('/:spaceId/pages/:pageId', async (req: Request, res: Response) => {
  const spaceId: string = req.params.spaceId
  const pageId: string = req.params.pageId


  if (!pageId) {
    res.status(400).send('Missing page ID')
    return
  }

  const token: AccessToken | null = await authService.GetTokenOrRedirect(req, res)
  if (!token) {
    return
  }

  const confluenceResource = token.accessibleResources.find(
    r => r.scopes.includes('read:page:confluence')
  )

  if (!confluenceResource) {
    res.status(400).send('No Confluence resource found')
    return
  }

  const accessToken = token.data.accessToken
  const cloudId = confluenceResource.id
  const page = await getPageById(accessToken, cloudId, pageId)

  const html = getSinglePageTemplate(page.title, spaceId, JSON.stringify(page.body))
  res.send(html)
})

export default router
