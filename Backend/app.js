const express = require('express');
const blogRouter = require('./routes/blogRouter');
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/blogs', blogRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));