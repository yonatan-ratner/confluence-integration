import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { getAllPages } from './services/pageService';
import { PagesResponse } from './models/IPages';
import { AccessToken } from 'models/IAuth';
import { AuthService } from './services/authService';

dotenv.config();

const app = express();
const port = 3000;


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

const authService: AuthService = AuthService.Instance()

app.get('/', (req, res) => {
  const uuid: string = crypto.randomUUID();
  req.session.uuid = uuid
  res.send('Hello World!');
})

const pages = '/pages'
app.get(pages, async (req, res) => {
  const token: AccessToken | null = await authService.GetTokenOrRedirect(req, res)
  if (!token) return; // redirected to auth flow

  const pages: PagesResponse = await getAllPages(token?.data.access_token!, token?.accessibleResources.id!)
  res.send(JSON.stringify(pages));
});

;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});