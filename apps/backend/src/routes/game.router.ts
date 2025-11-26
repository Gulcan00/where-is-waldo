import { Router } from "express";
import { validate } from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.post('/validate', validate);

export default gameRouter;