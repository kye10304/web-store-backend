const {User} = require('../models');
const {Product} = require('../models');
const request = require('supertest');
const app = require('../../app.js');
const jwt = require('jsonwebtoken');

describe('API to check and to deposit user balance', () => {
    let token;
    let userId;
    let productId;
        
    beforeEach(async () => {
        await User.destroy({ where: {}, truncate: true, cascade: true });
        await Product.destroy({ where: {}, truncate: true, cascade: true });

        const user = await User.create({
            email: 'userOne@test.com',
            passwordHash: '123456',
            role: 'user',
            balance: 5000.00
        });

        userId = user.id;
        token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role
            },
            process.env.JWT_SECRET||'secret'
          );

        const product = await Product.create({
            title: 'Наушники',
            price: 1500.00,
            stock: 10,
            category: 'electronics'
        })
        productId = product.id;
    })
    
    test('GET /user/checkBalance -> Show user balance', async () => {
        const res = await request(app)
            .get('/user/checkBalance')
            .set('Authorization', `Bearer ${token}`)
        
        console.log('USER TEST 1:', res.body)
            expect(res.statusCode).toBe(200);
        expect(Number(res.body.balance)).toBe(5000.00)
    })

    test('PATCH /user/deposit -> Update balance after deposit', async () => {
        const res = await request(app)
            .patch('/user/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send({deposit: 4000})
            
            console.log('USER TEST 2:', res.body)
        
        expect(res.statusCode).toBe(200)
        expect(Number(res.body.balance)).toBe(9000.00)
    })

    test('PATCH /user/deposit -> Should fail if deposit is negative or invalid', async () => {
        const res = await request(app)
            .patch('/user/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send({ deposit: -500 })
    
        console.log('USER TEST 3:', res.body)

        expect(res.statusCode).toBe(400);
    });

    test('GET /user/checkBalance -> Should fail if no token provided', async () => {
        const res = await request(app)
            .get('/user/checkBalance');
    
        console.log('USER TEST 4:', res.body)
        
        expect(res.statusCode).toBe(401);
    });

    test('PATCH /user/deposit -> Should correctly handle decimal deposit', async () => {
        const res = await request(app)
            .patch('/user/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send({ deposit: 1500.55 });
    
        console.log('USER TEST 5:', res.body)

        expect(res.statusCode).toBe(200);
        expect(Number(res.body.balance)).toBe(6500.55);
    });
})