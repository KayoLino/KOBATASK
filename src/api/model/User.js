const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const Task = require("./Task");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imagem_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    refresh_token_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: "users",
    timestamps: false,
    scopes: {
        safe: {
            attributes: {
                exclude: ["refresh_token_id", "senha"],
            },
        },
    },
});

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = User;