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

// import { Sequelize, DataTypes, Model } from 'sequelize'
// import sequelize from '../config/sequelize'
// import { User } from './User'

// export class Password extends Model {}

// Password.init(
//     {
//         // Model attributes are defined here
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull: false,
//             primaryKey: true,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         user_id: {
//             type: DataTypes.UUID,
//             required: true,
//             allowNull: false,
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         email: {
//             type: Sequelize.STRING,
//             validate: {
//                 isEmail: true,
//             },
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//         website: {
//             type: Sequelize.STRING,
//             allowNull: true,
//         },
//     },
//     {
//         // Other model options go here
//         sequelize, // We need to pass the connection instance
//         modelName: 'passwords', // We need to choose the model name
//         timestamps: true,
//     },

//     (Password.associate = (models) => {
//         Password.belongsTo(models.users, {
//             foreignKey: {
//                 name: 'user_id',
//             },
//             as: 'user',
//         })
//     })

//     //   return Password
//     // (Password.associate = function (models) {
//     //     Password.belongsTo(models.users)
//     // })

//     // Password.belongsTo(User, {
//     //     foreignKey: 'user_id',
//     //     as: 'user', // Alias for the relationship
//     // })
//     // Password.hasOne(User),
//     // User.belongsTo(Password, {
//     //     foreignKey: 'user_id',
//     // })
// )

// import sequelize from '../config/sequelize'
// import { Password } from './Password'
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
//             user_id: {
//                 type: DataTypes.UUID,
//                 required: true,
//                 allowNull: false,
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
//             password: {
//                 type: Sequelize.STRING,
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
//             tableName: 'users',
//             modelName: 'users',
//         }
//     )
//     // User.associate = function (models) {
//     //     User.hasMany(models.password)
//     // }
//     // return User
//     Password.hasOne(User, {
//         foreignKey: {
//             name: 'user_id',
//         },
//     })
// }

// // Option 4
// // Password.hasOne(User)
// // User.hasMany(Password, {
// //     foreignKey: {
// //         name: 'userId',
// //     },
// // })

import sequelize from '../config/sequelize'
import { DataTypes } from 'sequelize'
// import { User } from './User'
import User from './User'

const Password = sequelize.define(
    'Password',
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
        user_id: {
            type: DataTypes.UUID,
            required: true,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        name: {
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
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        // sequelize,
        // tableName: 'users',
        // modelName: 'users',
    }
)
User.hasMany(Password, {
    foreignKey: 'user_id', // The foreign key in Todo table
    as: 'passwords', // Alias for the relationship
})

Password.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user', // Alias for the relationship
})

module.exports = Password
