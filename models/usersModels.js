// for password hashing
var bcrypt = require("bcrypt-nodejs");
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
      },
      unique: {
        args: true,
        msg: 'Email adress already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
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
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Users;
};