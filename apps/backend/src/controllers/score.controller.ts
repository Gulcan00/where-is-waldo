import type { Request, Response } from "express";
import { body, param, validationResult } from 'express-validator';
import { prisma } from "../prisma/client";

const updateScore = [
        param('id').isAlphanumeric().withMessage('Id is required'),
        body('name').trim().notEmpty().withMessage('Name is required'),
        async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { name } = req.body;
        await prisma.score.update({
            data: {
                name
            },
            where: {
                id: req.params.id!
            }
        });

        return res.json("Score updated");
    }
];

export { updateScore }