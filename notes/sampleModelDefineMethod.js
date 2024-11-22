module.exports = (sequelize, Sequelize, DataTypes) => {
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
            sequelize,
            tableName: 'users',
        }
    )
    // User.associate = function (models) {
    //     User.hasMany(models.password)
    // }
    // return User
}

// Option 4
Password.hasOne(User)
User.belongsTo(Password, {
    foreignKey: {
        name: 'userId',
    },
})
