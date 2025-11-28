import { prisma } from "../src/prisma/client";

async function main() {
    const waldo = await prisma.character.create({
        data: { name: 'Waldo', imgUrl: '/images/characters/waldo.png'}
    });

    const wenda = await prisma.character.create({
        data: { name: 'Wenda', imgUrl: '/images/characters/wenda.png'}
    });

    const wizard = await prisma.character.create({
        data: { name: 'Wizard Whitebeard', imgUrl: '/images/characters/wizard.png'}
    });

    const odlaw = await prisma.character.create({
        data: { name: 'Odlaw', imgUrl: '/images/characters/odlaw.png'}
    });

    await prisma.position.createMany({
        data: [
            { xCoordinate: 0.56966667, yCoordinate: 0.35212620, radius: 0.02000000, characterId: waldo.id, imgUrl: '/images/scenes/scene1.jpeg'},
            { xCoordinate: 0.38966666, yCoordinate: 0.32561068, radius: 0.02000000, characterId: wenda.id, imgUrl: '/images/scenes/scene1.jpeg'}, 
            { xCoordinate: 0.84966666, yCoordinate: 0.85061812, radius: 0.02000000, characterId: wizard.id, imgUrl: '/images/scenes/scene1.jpeg'},
            { xCoordinate: 0.40299999, yCoordinate: 0.59819030, radius: 0.02000000, characterId: odlaw.id, imgUrl: '/images/scenes/scene1.jpeg'},
            { xCoordinate: 0.42966666, yCoordinate: 0.74692213, radius: 0.02000000, characterId: waldo.id, imgUrl: '/images/scenes/scene2.jpeg'},
            { xCoordinate: 0.43299999, yCoordinate: 0.59581071, radius: 0.02000000, characterId: wenda.id, imgUrl: '/images/scenes/scene2.jpeg'},
            { xCoordinate: 0.65633333, yCoordinate: 0.77390631, radius: 0.02000000, characterId: wizard.id, imgUrl: '/images/scenes/scene2.jpeg'},
            { xCoordinate: 0.58966666, yCoordinate: 0.95200190, radius: 0.02000000, characterId: odlaw.id, imgUrl: '/images/scenes/scene2.jpeg'},
            { xCoordinate: 0.93966666, yCoordinate: 0.05801136, radius: 0.02000000, characterId: waldo.id, imgUrl: '/images/scenes/scene3.jpeg'},
            { xCoordinate: 0.27633333, yCoordinate: 0.64330456, radius: 0.02000000, characterId: wenda.id, imgUrl: '/images/scenes/scene3.jpeg'},
            { xCoordinate: 0.28633333, yCoordinate: 0.39468444, radius: 0.02000000, characterId: wizard.id, imgUrl: '/images/scenes/scene3.jpeg'},
            { xCoordinate: 0.89966666, yCoordinate: 0.55525160, radius: 0.02000000, characterId: odlaw.id, imgUrl: '/images/scenes/scene3.jpeg'}
        ]
    });

    console.log('Seed finished');
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})