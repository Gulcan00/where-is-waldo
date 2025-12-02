import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import "dotenv/config";
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import gameRouter from './routes/game.router';
import characterRouter from './routes/character.router';
import { prisma } from './prisma/client';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,             
  })
);

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000, // ms,
     secure: process.env.NODE_ENV === "PROD"
    },
    secret: process.env.SECRET!,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true
      }
    )
  })
);


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', gameRouter);
app.use('/character', characterRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


app.use(((err, req, res, next) => {
  return res.status(err.status || 500).json({err});
}) as ErrorRequestHandler);

