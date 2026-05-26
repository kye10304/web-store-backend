const express = require('express');
require('dotenv').config();
const { connectDB } = require('./sequelize');

const { mainRouter } = require('./src/routes/mainPageRoute');
const { authRouter } = require('./src/routes/authRoutes');
const { productRouter } = require('./src/routes/productRoutes');
const { orderRouter } = require('./src/routes/orderRoutes');
const { userRouter } = require('./src/routes/userRoutes');
const app = express();
const port = 3000;
connectDB();
app.use(express.json());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);


app.listen(port, () => console.log(`App successfully running on ${port} port`));
