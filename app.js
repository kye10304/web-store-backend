const express = require('express');
const mainRouter = require('./src/routes/mainPageRoute');
const authRouter = require('./src/routes/authRoutes');
const productRouter = require('./src/routes/productRoutes');
const orderRouter = require('./src/routes/orderRoutes');
const userRouter = require('./src/routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');

const app = express();

app.use(express.json());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = app