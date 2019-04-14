module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    borrowerRating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    gives: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gets: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    addInterest: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    interstRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  });
  return Users;
};