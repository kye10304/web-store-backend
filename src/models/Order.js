const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'Created', 
                'In_Progress', 
                'Paid', 
                'Cancelled'),
            allowNull: false,
            defaultValue: 'Created'            
        },

        total_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    })
}