const {Router} = require('express');
const {authenticateToken} = require('../auth');
const prisma = require('../prisma');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    const comments = await prisma.comment.findMany({
        where: {blogID: req.params.blogID}
    });

    res.status(200).json({comments});
});

router.use(authenticateToken);

router.post('/', async (req, res) => {
    try {
        await prisma.comment.create({
            data: {
                content: req.body.content,
                blogID: req.params.blogID,
                authorID: req.user.userID,
                created: new Date()
            }
        })
        res.status(201).json({message: "Comment created successfully"});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({error: "Bad Request"});
    }
});

module.exports = router;