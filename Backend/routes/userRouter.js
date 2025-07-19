const {Router} = require('express');
const {authenticateToken} = require('../auth');
const prisma = require('../prisma');

const router = Router();

router.get('/@me', authenticateToken, async (req, res) => {
    res.json({user: req.user});
});

router.get('/:userID', async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {userID: req.params.userID}
    })

    if (!user) return res.sendStatus(404);

    res.status(200).json({user});
});

module.exports = router;