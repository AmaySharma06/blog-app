const prisma = require('./prisma');

async function main() {
    const userID = (await prisma.user.findFirst()).userID
    await prisma.user.update({
        where: { userID },
        data: { isAdmin: true }
    })
}

main();