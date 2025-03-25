import express, { Express, Request, Response } from "express";
import session from 'express-session'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter'
import spacesRouter from './routes/spacesRouter'
import pagesRouter from './routes/pagesRouter'
import getIndexPage from "./templates/indexTemplate";

dotenv.config()

const app: Express = express()
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
app.use('/', spacesRouter)
app.use('/', pagesRouter)

app.get('/', (req: Request, res: Response) => {
  const uuid: string = crypto.randomUUID()
  req.session.uuid = uuid
  
  const html = getIndexPage()
  res.send(html)
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})