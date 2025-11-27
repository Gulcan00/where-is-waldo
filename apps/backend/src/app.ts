import express from 'express';
import cors from 'cors';
import "dotenv/config";
import gameRouter from './routes/game.router';
import characterRouter from './routes/character.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', gameRouter);
app.use('/character', characterRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


//TODO Global error handling