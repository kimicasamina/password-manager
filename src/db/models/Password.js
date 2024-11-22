// module.exports = (sequelize, Sequelize, DataTypes) => {
//     const Password = sequelize.define(
//         'Password',
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
//             name: {
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
//             website: {
//                 type: Sequelize.STRING,
//                 allowNull: true,
//             },
//         },
//         {
//             sequelize,
//             tableName: 'passwords',
//         }
//     )
//     // Password.associate = function (models) {
//     //     Password.belongsTo(models.user)
//     // }
//     // return Password
// }

import { Sequelize, DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize'

export class Password extends Model {}

Password.init(
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
        name: {
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
        website: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'passwords', // We need to choose the model name
        timestamps: true,
    },
    (Password.associate = function (models) {
        Password.belongsTo(models.users)
    })
)
