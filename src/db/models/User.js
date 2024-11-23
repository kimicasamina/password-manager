import sequelize from '../config/sequelize'
import { DataTypes } from 'sequelize'
import { Password } from './Password'
const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: true,
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] },
            },
        },
        // sequelize,
        // tableName: 'users',
        // modelName: 'users',
    }
)

module.exports = User
