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

        // user_id: {
        //     type: DataTypes.UUID,
        //     required: true,
        //     allowNull: false,
        //     // references: {
        //     //     model: User,
        //     //     key: 'user_id',
        //     // },
        // },

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
        // sequelize,
        // tableName: 'users',
        // modelName: 'users',
    }
)

module.exports = User
