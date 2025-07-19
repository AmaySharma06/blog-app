require('dotenv').config();
const jwt = require('jsonwebtoken');
const prisma = require('./prisma');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        const userData = await prisma.user.findFirst({
            where: {
                userID: user.userID
            }
        });

        if (!userData) return res.sendStatus(403);
        req.user = userData;
        next();
    });
}

async function adminAuth(req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(401).json({error: "This action requires admin previlages"});
    }
    next();
}

module.exports = {
    authenticateToken,
    adminAuth
};