import express, { Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import homeRouter from "./routes/home.routes";
import authRouter from "./routes/auth/auth.routes";
import spacesRouter from "./routes/spaces/spaces.routes";
import pagesRouter from "./routes/pages/pages.routes";

dotenv.config();

const app: Express = express();
const port = 3000;

const sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // change to true in production w/ HTTPS
    sameSite: "lax",
  },
};
app.use(session(sessionOptions));

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/", spacesRouter);
app.use("/", pagesRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
