const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const RefreshToken = sequelize.define('RefreshToken', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
    {
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
    }
);

module.exports = RefreshToken;