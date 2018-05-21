const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'User', {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            hooks: {
                beforeCreate: (User, options) => {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(User.password, salt);
                    User.password = hash;
                }
            }
        }
    );

    User.associate = (models) => {
        models.User.hasMany(models.Message);
    };

    return User;
};