const express = require('express');
const blogRouter = require('./routes/blogRouter');
const indexRouter = require('./routes/indexRouter');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/blogs/', blogRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));