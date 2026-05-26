const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 

        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00
        },

        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, 

        category: {
            type: DataTypes.ENUM('food', 'electronics'),
            allowNull: false
        }
    }, {
        tableName: 'products',
        timestamps: false
    })
}
