const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },

        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'password_hash'
        },

        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        },

        balance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00
        }
    }, {
        tableName: 'users',
        timestamps: false
    })
}