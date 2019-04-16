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
        payDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: null
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lenderName: {
            type: DataTypes.STRING,
            allowNull: false
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
        borrowerName: {
            type: DataTypes.STRING,
            allowNull: false
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