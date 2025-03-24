import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import { getAllPages } from './services/pageService'
import { PagesResponse } from './models/IPages'
import { AccessToken } from './models/IAuth'
import { AuthService } from './services/authService'
import authRouter from './routes/authRouter'
import spacesRouter from './routes/spacesRouter'
import pagesRouter from './routes/pagesRouter'

dotenv.config()

const app = express()
const port = 3000

const sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // change to true in production w/ HTTPS
    sameSite: 'lax',
  },
}
app.use(session(sessionOptions))

app.use('/', authRouter)
app.use('/spaces', spacesRouter)
app.use('/pages', pagesRouter)

const authService: AuthService = AuthService.Instance()

app.get('/', (req, res) => {
  const uuid: string = crypto.randomUUID()
  req.session.uuid = uuid
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confluence Integration</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f5f6fa;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          color: #333;
          margin-bottom: 40px;
        }
        .btn {
          padding: 12px 24px;
          background-color: #0052cc;
          color: white;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-size: 16px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #0065ff;
        }
      </style>
    </head>
    <body>
      <h1>Yonatans Confluence Integration</h1>
      <a href="/spaces" class="btn">Get Spaces</a>
    </body>
    </html>
  `

  res.send(html)
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})