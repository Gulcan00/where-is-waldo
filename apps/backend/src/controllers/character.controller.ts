import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

const getCharacters = (req: Request, res: Response, next: NextFunction) => {
    prisma.character.findMany()
    .then(characters => {
        return res.json(characters)
    })
    .catch(err => next(err));
}


export { getCharacters };