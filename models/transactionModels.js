module.exports = function (sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions",{
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        payDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: null
        },
        lenderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lenderApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: null
        },
        borrowerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        borrowerApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: null
        }
    });
    return Transactions;
};