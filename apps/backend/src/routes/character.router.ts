import { Router } from "express";
import { getCharacters } from "../controllers/character.controller";

const characterRouter = Router();

characterRouter.get('/', getCharacters);

export default characterRouter;