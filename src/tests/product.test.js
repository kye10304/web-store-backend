const {Product} = require('../models');
const request = require('supertest');
const app = require('../../app.js');

describe('Api to get Products', () => {

    beforeEach(async () => {
        await Product.destroy({ where: {} });
    });

    test('GET /products -> should give all products list', async () => {
        await Product.bulkCreate([{
            title: 'Iphone',
            price: 1000.00,
            stock: 5,
            category: 'electronics'
        }, {
            title: 'Apple',
            price: 5.40,
            stock: 10,
            category: 'food'
        }])


        const res = await request(app)
            .get('/products')
        
        console.log('PRODUCT TEST 1:', res.body)

        expect(res.statusCode).toBe(200);
        expect(res.body[0].product_title).toBe('Iphone')
        expect(res.body[1].category).toBe('food')
    })

    test('GET /products?category=food -> should give products list by category', async () => {
        await Product.bulkCreate([{
            title: 'Iphone',
            price: 1000.00,
            stock: 5,
            category: 'electronics'
        }, {
            title: 'Apple',
            price: 5.40,
            stock: 10,
            category: 'food'
        }])


        const res = await request(app)
            .get('/products')
            .query({
                category: 'food'
            })
        
        console.log('PRODUCT TEST 2:', res.body)

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1)
        expect(res.body[0].product_title).toBe('Apple')
    })

    test('Product.create -> should fail if category is not in ENUM', async () => {
        // Пытаемся создать продукт с запрещенной категорией 'space'
        await expect(Product.create({
            title: 'Alien Spaceship',
            price: 999999,
            stock: 1,
            category: 'space' // Элемент не из ENUM
        })).rejects.toThrow(); // Ожидаем, что Sequelize выбросит ошибку валидации
    });
})