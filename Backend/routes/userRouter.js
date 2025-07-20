const {Router} = require('express');
const {authenticateToken} = require('../auth');
const prisma = require('../prisma');

const router = Router();

router.get('/@me', authenticateToken, async (req, res) => {
    const blogs = await prisma.blog.findMany({ where: { authorID: req.user.userID } });
    res.json({ user: {
        userID: req.user.userID,
        username: req.user.username,
        isAdmin: req.user.isAdmin
    }, blogs });
});

router.get('/:userID', async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {userID: req.params.userID}
    })

    if (!user) return res.sendStatus(404);

    res.status(200).json({user});
});

module.exports = router;