require('../models');
const request = require('supertest');
const app = require('../../app.js');

describe('Auth API', () => {

    const userData = {
        email: 'test@test.com',
        password: '123456'
    }

    test('POST /auth/register -> should create user', async () => {

        const res = await request(app)
            .post('/auth/register')
            .send(userData)
        
        console.log('AUTH TEST 1:', res.body)

        expect(res.statusCode).toBe(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe(userData.email)

    })

    test('POST /auth/login -> should return token', async () => {

        const res = await request(app)
            .post('/auth/login')
            .send(userData)

        console.log('AUTH TEST 2:', res.body)

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    })

    test('POST /auth/login -> shouldn`t login, wrong password', async () => {
        const wrongUserData = {
                email: 'test@test.com',
                password: '1234567'     
        }

        const res = await request(app)
            .post('/auth/login')
            .send(wrongUserData)

        console.log('AUTH TEST 3:', res.body)

        expect(res.statusCode).toBe(401);
    })
})