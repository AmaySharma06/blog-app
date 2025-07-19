const {Router} = require('express');
const prisma = require('../prisma');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    const existing = await prisma.user.findFirst({
        where: {username}
    });

    if (existing) {
        return res.status(400).json({
            message: 'User already exists!'
        });
    }

    const hashed = await bcryptjs.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            password: hashed, 
            isAdmin: false
        }
    })

    res.status(201).json({message: "User registered!"});
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {username}
    });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET);

    res.json({ token });
});

module.exports = router;