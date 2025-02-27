const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM("Trabalho", "Projeto", "Pessoal"),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Em andamento", "Concluída", "Atrasado"),
    allowNull: false,
    defaultValue: "Pendente",
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataFim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prioridade: {
    type: DataTypes.ENUM("Baixa", "Média", "Alta"),
    allowNull: false,
    defaultValue: "Média"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: "tasks",
  timestamps: true,
});

module.exports = Task;
