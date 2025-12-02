import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

const validate = async (req: Request, res: Response, next: NextFunction) => {
    // TODO validate req body using express validation
    const { characterId, positionX, positionY, imgUrl } = req.body;
    try {
        const position = await prisma.position.findFirstOrThrow({
            where: {
                characterId,
                imgUrl
            }
        });

        const distance = Math.sqrt(Math.pow(positionX - Number(position.xCoordinate), 2) + Math.pow(positionY - Number(position.yCoordinate), 2));

        if (distance <= Number(position.radius)) {
            return res.json(true);
        } 

        return res.json(false);
    } catch(err) {
        next(err);
    }
}

const startGame = (req: Request, res: Response) => {
    req.session.startTime = Date.now();
    return res.json("Game started");
}

const endGame = async (req: Request, res: Response) => {
    const start = req.session.startTime;
    if (!start) return res.status(400).json({error: "Game not started"});

    const name = req.body.name;
    await prisma.score.create({
        data: {
            name, 
            sid: req.sessionID,
            time: Date.now() - start
        }
    });
    return res.json("Game ended");
}

export { validate, startGame, endGame };