import { Router } from "express";
import { updateScore } from "../controllers/score.controller";

const scoreRouter = Router();

scoreRouter.put('/:id', updateScore);

export default scoreRouter;