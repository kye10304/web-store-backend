const {sequelize} = require('../../sequelize.js');

const UserModel = require('./User');
const OrderModel = require('./Order');
const ProductModel = require('./Product');
const OrderItemModel = require('./OrderItem');

const User = UserModel(sequelize);
const Order = OrderModel(sequelize);
const Product = ProductModel(sequelize);
const OrderItem = OrderItemModel(sequelize);

User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'items',
});

OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order',
});

Product.hasMany(OrderItem, {
    foreignKey: 'product_id',
    as: 'order_items',
});

OrderItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
});

Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'product_id',
    otherKey: 'order_id',
    as: 'orders',
});

Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'order_id',
    otherKey: 'product_id',
    as: 'products',
});

module.exports = { 
    User, 
    Order, 
    Product, 
    OrderItem,
    sequelize
};
