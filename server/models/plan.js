

module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    principal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {});
  Plan.associate = function (models) {
    // associations can be defined here
    Plan.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Plan;
};
