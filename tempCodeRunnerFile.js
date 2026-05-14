const express = require('express');
const {mainRouter} = require('./routes/mainPageRoute');
const {userRouter} = require('./routes/userRouter');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', mainRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`App succesfully running on ${port} port`));
