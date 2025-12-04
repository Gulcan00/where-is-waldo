import { Router } from "express";
import { getScores, updateScore } from "../controllers/score.controller";

const scoreRouter = Router();

scoreRouter.put('/:id', updateScore);
scoreRouter.get('', getScores);

export default scoreRouter;