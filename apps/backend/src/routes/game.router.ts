import { Router } from "express";
import { endGame, startGame, validate } from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.post('/validate', validate);
gameRouter.post('/start-game', startGame);
gameRouter.post('/end-game', endGame);

export default gameRouter;