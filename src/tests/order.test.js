const {Product, Order, User, OrderItem} = require('../models');
const request = require('supertest');
const app = require('../../app.js');
const jwt = require('jsonwebtoken');
const productRepository = require('../repositories/productRepositoryORM');

describe('API to create and to pay the orders', () => {
    let userList;
    let productIds;

    const generateToken = (user) => {
        return jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role
            },
            process.env.JWT_SECRET||'secret'
          )
    }

    beforeEach(async () => {
        await User.destroy({where: {}, truncate: true, cascade: true});
        await Product.destroy({where: {}, truncate: true, cascade: true});

        userList = await User.bulkCreate([{
            email: 'userOne@test.com',
            passwordHash: '123456',
            role: 'user',
            balance: 10.00
        }, {
            email: 'adminOne@test.com',
            passwordHash: '1234567',
            role: 'admin',
            balance: 0.00
        }, {
            email: 'userTwo@test.com',
            passwordHash: '123458',
            role: 'user',
            balance: 3200.00
        }]);
       
        const product = await Product.bulkCreate([{
            title: 'Headphones',
            price: 1500.00,
            stock: 10,
            category: 'electronics'
        }, {
            title: 'Pineapple',
            price: 50.00,
            stock: 30,
            category: 'food'
        }])
        productIds = product.map (el => el.id)
    })


    test('POST /order/checkout -> creates order, orderItem, calculates total price', async () => {
        const user = userList[0] //user
        const token = generateToken(user);

        const order = {
            items: [{
            productId: productIds[0],
            quantity: 2
        }, {
            productId: productIds[1],
            quantity: 4
        }]};

        const res = await request(app)
            .post('/order/checkout')
            .set('Authorization', `Bearer ${token}`)
            .send(order)

        console.log('ORDER/CHECKOUT TEST 1:', res.body)
        
        expect(res.statusCode).toBe(201);
        expect(Number(res.body.total_price)).toBe(3200);
        expect(res.body.user_id).toBe(user.id);
        expect(res.body).toHaveProperty('id');
    })

    test('POST /order/checkout -> create order without available stock', async () => {
        const user = userList[0] //user
        const token = generateToken(user);

        const order = {
            items: [{
            productId: productIds[0],
            quantity: 2
        }, {
            productId: productIds[1],
            quantity: 40
        }]};

        const res = await request(app)
            .post('/order/checkout')
            .set('Authorization', `Bearer ${token}`)
            .send(order)

        console.log('ORDER/CHECKOUT TEST 2:', res.body, res.statusCode)

        expect(res.statusCode).toBe(400)
    })

    test('POST /order/checkout -> create order with admin role (Forbidden)', async () => {
        const user = userList[1] //admin
        const token = generateToken(user);

        const order = {
            items: [{
            productId: productIds[0],
            quantity: 2
        }, {
            productId: productIds[1],
            quantity: 40
        }]};

        const res = await request(app)
            .post('/order/checkout')
            .set('Authorization', `Bearer ${token}`)
            .send(order)

        console.log('ORDER/CHECKOUT TEST 3:', res.body, res.statusCode);

        expect(res.statusCode).toBe(403)
    })

    test('POST /order/checkout -> stock should deplete', async () => {
        const user = userList[0] //user
        const token = generateToken(user);

        const order = {
            items: [{
            productId: productIds[0],
            quantity: 2
        }, {
            productId: productIds[1],
            quantity: 5
        }]};

        const res = await request(app)
            .post('/order/checkout')
            .set('Authorization', `Bearer ${token}`)
            .send(order)

        const updatedProduct = await productRepository.products({id: productIds[1]});
        
        console.log('ORDER/CHECKOUT TEST 4:', updatedProduct[0]);
        console.log('ORDER/CHECKOUT TEST 4:', updatedProduct[0].stock);

        expect(res.statusCode).toBe(201);
        expect(updatedProduct[0].stock).toBe(25);
    })

    test('PATCH /order/updateOrder/:id/status —> should update order status to "In_Progress"', async () => {

        const user = userList[1]

        const order = await Order.create({
            user_id: user.id,
            status: 'Created',
            total_price: 300,
        })

        const token = generateToken(user);

        const res = await request(app)
            .patch(`/order/updateOrder/${order.id}/status`)
            .set('Authorization', `Bearer ${token}`)
            .send({status: 'In_Progress'})

        const updatedOrder = await Order.findByPk(order.id);

        console.log('ORDER/statusUpdate TEST 1:', updatedOrder.status);

        expect(res.statusCode).toBe(200);
        expect(updatedOrder.status).toBe('In_Progress');
    })

    test('PATCH /order/updateOrder/:id/status —> should throw error if not paid order changin status to "Executed"', async () => {

        const user = userList[1]

        const order = await Order.create({
            user_id: user.id,
            status: 'Created',
            total_price: 300,
        })

        const token = generateToken(user);

        const res = await request(app)
            .patch(`/order/updateOrder/${order.id}/status`)
            .set('Authorization', `Bearer ${token}`)
            .send({status: 'Executed'})

        const updatedOrder = await Order.findByPk(order.id);

        console.log('ORDER/statusUpdate TEST 2:', res.body);

        expect(res.statusCode).toBe(400);
        expect(updatedOrder.status).toBe('Created');
    })

    test('PATCH /order/orderPayment/:id —> should pay confirmed("In_Progress") order, change status to "Paid"', async () => {
        const user = userList[2]

        const order = await Order.create({
            user_id: user.id,
            status: 'In_Progress',
            total_price: 300,
        })

        const token = generateToken(user);

        const res = await request(app)
            .patch(`/order/orderPayment/${order.id}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('ORDER//orderPayment TEST 1:', res.body);

        expect(res.statusCode).toBe(200)
        expect(res.body.updateOrderStatus.status).toBe('Paid')
        expect(Number(res.body.updateUserBalance.balance)).toBe(2900)

    })
    
    test('PATCH /order/orderPayment/:id —> should fail, not sufficient funds', async () => {
        const user = userList[0]

        const order = await Order.create({
            user_id: user.id,
            status: 'In_Progress',
            total_price: 300,
        })

        const token = generateToken(user);

        const res = await request(app)
            .patch(`/order/orderPayment/${order.id}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('ORDER//orderPayment TEST 2:', res.body);

        expect(res.statusCode).toBe(400)
    })
})