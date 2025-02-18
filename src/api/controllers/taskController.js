const User = require("../model/User");
const Task = require("../model/Task");

const checkCategoryAndStatus = (category, status) => {
  const validCategories = ["Trabalho", "Projeto", "Pessoal"];
  const validStatuses = ["Pendente", "Em andamento", "Concluída", "Atrasada"];

  if (!validCategories.includes(category)) return { error: "Categoria inválida." };
  if (!validStatuses.includes(status)) return { error: "Status inválido." };

  return null;
};

const checkDate = (finishDate, initDate) => {
  if (new Date(finishDate) < new Date(initDate)) {
    return { error: "A data de término não pode ser antes da data de início." };
  }
  return null;
};

const createTask = async (req, res) => {
  try {
    const { nameTask, category, description, status, initDate, finishDate } = req.body;
    const categoryStatusError = checkCategoryAndStatus(category, status);
    if (categoryStatusError) return res.status(400).json({ errors: [categoryStatusError.error] });

    const dateError = checkDate(finishDate, initDate);
    if (dateError) return res.status(400).json({ errors: [dateError.error] });

    const newTask = await Task.create({
      nome: nameTask,
      categoria: category,
      descricao: description,
      status,
      dataInicio: initDate,
      dataFim: finishDate,
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Tarefa criada com sucesso!", task: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
};

const updateTask = async (req, res) => {
  try {
    const { nameTask, category, description, status, initDate, finishDate } = req.body;
    const { taskId } = req.params;

    const categoryStatusError = checkCategoryAndStatus(category, status);
    if (categoryStatusError) return res.status(400).json({ errors: [categoryStatusError.error] });

    const dateError = checkDate(finishDate, initDate);
    if (dateError) return res.status(400).json({ errors: [dateError.error] });

    const taskExists = await Task.findOne({ where: { id: taskId, userId: req.user.id } });
    if (!taskExists) return res.status(404).json({ errors: ["Tarefa não encontrada."] });

    await Task.update(
      { nome: nameTask, categoria: category, descricao: description, status, dataInicio: initDate, dataFim: finishDate },
      { where: { id: taskId, userId: req.user.id } }
    );

    const updatedTask = await Task.findByPk(taskId);
    return res.status(200).json({ message: "Tarefa atualizada com sucesso!", task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({ where: { id: taskId, userId: req.user.id } });

    if (!task) return res.status(404).json({ errors: ["Tarefa não encontrada."] });

    await task.destroy();
    return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });

    const now = new Date(new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }));

    const updatedTasks = tasks.map(task => {
      const finishDate = new Date(new Date(task.dataFim).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }));
      return {
        ...task.toJSON(),
        status: finishDate < now && task.status !== "Concluída" ? "Atrasada" : task.status
      };
    });

    return res.status(200).json({ tasks: updatedTasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
};
