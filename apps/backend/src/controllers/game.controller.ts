import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

const validate = async (req: Request, res: Response, next: NextFunction) => {
    // TODO validate req body using express validation
    const { characterId, positionX, positionY, imgUrl } = req.body;
    const position = await prisma.position.findFirstOrThrow({
        where: {
            characterId,
            imgUrl
        }
    });

    const distance = Math.sqrt(Math.pow(positionX - Number(position.xCoordinate), 2) + Math.pow(positionY - Number(position.yCoordinate), 2));

    if (distance <= Number(position.radius)) {
        return res.json({result: true});
    } 

    return res.json({result: false});
}

export { validate };