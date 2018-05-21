module.exports = (sequelize, DataTypes) => {
    let Message = sequelize.define('Message', {
        title: DataTypes.STRING
    });

    Message.associate = (models) => {
        models.Message.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};