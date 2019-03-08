

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wallet: {
      type: DataTypes.DECIMAL,
      defaultValue: '0.00',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Plan, {
      foreignKey: 'userId',
      as: 'plans',
    });
    User.hasMany(models.complain, {
      foreignKey: 'userId',
      as: 'complains',
    });
  };
  return User;
};
