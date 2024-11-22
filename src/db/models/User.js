// module.exports = (sequelize, Sequelize, DataTypes) => {
//     const User = sequelize.define(
//         'User',
//         {
//             id: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4,
//                 allowNull: false,
//                 primaryKey: true,
//                 validate: {
//                     notEmpty: true,
//                 },
//             },
//             username: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: true,
//                 },
//             },
//             email: {
//                 type: Sequelize.STRING,
//                 validate: {
//                     isEmail: true,
//                 },
//                 allowNull: false,
//                 validate: {
//                     notEmpty: true,
//                 },
//             },
//             password: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: true,
//                 },
//             },
//         },
//         {
//             sequelize,
//             tableName: 'users',
//         }
//     )
//     // User.associate = function (models) {
//     //     User.hasMany(models.password)
//     // }
//     // return User
// }

// Option 4
// Password.hasOne(User)
// User.belongsTo(Password, {
//     foreignKey: {
//         name: 'userId',
//     },
// })

import { Sequelize, DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize'

export class User extends Model {}

User.init(
    {
        // Model attributes are defined here
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
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'users', // We need to choose the model name
    },
    (User.associate = function (models) {
        User.hasMany(models.passwords)
    })
)
