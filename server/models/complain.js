'use strict';
module.exports = (sequelize, DataTypes) => {
  const complain = sequelize.define('complain', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
  }, {});
  complain.associate = function(models) {
    // associations can be defined here
    complain.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  };
  return complain;
};