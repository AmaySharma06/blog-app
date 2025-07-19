const {Router} = require('express');
const prisma = require('../prisma');
const commentRouter = require('./commentRouter');
const {authenticateToken, adminAuth} = require('../auth');
const router = Router();

router.use('/:blogID/comments/', commentRouter);

router.get('/:blogID', async (req, res) => {
    const blog = await prisma.blog.findFirst({
        where: {blogID : req.params.blogID},
        include: {comments: false}
    })

    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
});

router.get('/', async (req, res) => {
    const blogs = await prisma.blog.findMany({
        select: { blogID: true }
    });

    res.json(blogs);
});


router.use(authenticateToken, adminAuth);

router.post('/', async (req, res) => {
    try {
        await prisma.blog.create({
            data: {
                heading: req.body.heading,
                content: req.body.content,
                authorID: req.user.userID,
                created: new Date()
            }
        })
        res.status(201).json({message: "Blog created successfully"});
    }
    catch {
        res.status(400).json({error: "Bad Request"});
    }
});

router.put('/:blogID', async (req, res) => {
    const blog = await prisma.blog.findFirst({
        where: {
            blogID : req.params.blogID
        }
    });

    if (!blog) {
        return res.status(404).json({error : "Blog not found!"});
    }

    if (blog.authorID != req.user.userID) {
        return res.status(401).json({error: "Unauthorized"});
    }

    await prisma.blog.update({
        where: {blogID : req.params.blogID},
        data : {
            heading: req.body.heading,
            content: req.body.content
        }
    })

    res.status(200).json({message: "Blog edited successfully"});
});

router.delete('/:blogID', async (req, res) => {
    const blog = await prisma.blog.findFirst({
        where: {
            blogID : req.params.blogID
        }
    });

    if (!blog) {
        return res.status(404).json({error : "Blog not found!"});
    }

    if (blog.authorID != req.user.userID) {
        return res.status(401).json({error: "Unauthorized"});
    }

    await prisma.blog.delete({
        where: {blogID : req.params.blogID}
    });

    res.status(200).json({message: "Blog Deleted successfully"});
});

module.exports = router;