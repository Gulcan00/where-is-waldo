import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { prisma } from "../prisma/client";

const validate = [
        body('characterId').isNumeric().withMessage('characterId is required'),
        body('positionX').isNumeric().withMessage('positionX is required'),
        body('positionY').isNumeric().withMessage('positionY is required'),
        body('imgUrl').notEmpty().withMessage('imgUrl is required')
        .matches(/^\/assets\/images\/scenes\/scene[1|2|3].jpeg/).withMessage('Invalid image path'),
        async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
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
];

const startGame = (req: Request, res: Response) => {
    req.session.startTime = Date.now();
    return res.json("Game started");
}

const endGame = [
        body('name').trim().isAlphanumeric().withMessage('Name is required'),
        async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const start = req.session.startTime;
        if (!start) return res.status(400).json({error: "Game not started"});

        const { name } = req.body;
        await prisma.score.create({
            data: {
                name, 
                sid: req.sessionID,
                time: Date.now() - start
            }
        });
        return res.json("Game ended");
    }
];

export { validate, startGame, endGame };