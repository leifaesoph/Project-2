module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
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
      allowNull: false
    },
    gives: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addInterest: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    interstRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  return Users;
};