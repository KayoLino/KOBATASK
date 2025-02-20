const User = require("../model/User");
const Task = require("../model/Task");

const adjustToUTC3 = (date) => {
  const d = new Date(date);
  d.setHours(d.getHours() + 3);
  return d;
};

const checkEnums = (category, status, priority) => {
  const validCategories = ["Trabalho", "Projeto", "Pessoal"];
  const validStatuses = ["Pendente", "Em andamento", "Concluída", "Atrasado"];
  const validPriority = ["Baixa", "Média", "Alta"];

  if (!validCategories.includes(category)) return { error: "Categoria inválida." };
  if (!validStatuses.includes(status)) return { error: "Status inválido." };
  if (!validPriority.includes(priority)) return { error: "Prioridade inválida." };

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
    const { nameTask, category, description, status, initDate, finishDate, priority } = req.body;

    const enumsError = checkEnums(category, status, priority);
    if (enumsError) return res.status(400).json({ errors: [enumsError.error] });

    const dateError = checkDate(finishDate, initDate);
    if (dateError) return res.status(400).json({ errors: [dateError.error] });


    const initDateUtc3 = adjustToUTC3(initDate);
    const finishDateUtc3 = adjustToUTC3(finishDate);

    const newTask = await Task.create({
      nome: nameTask,
      categoria: category,
      descricao: description,
      status,
      dataInicio: initDateUtc3,
      dataFim: finishDateUtc3,
      prioridade: priority,
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
    const { nameTask, category, description, status, initDate, finishDate, priority } = req.body;
    const { taskId } = req.params;

    const enumsError = checkEnums(category, status, priority);
    if (enumsError) return res.status(400).json({ errors: [enumsError.error] });

    const dateError = checkDate(finishDate, initDate);
    if (dateError) return res.status(400).json({ errors: [dateError.error] });

    const initDateUtc3 = adjustToUTC3(initDate);
    const finishDateUtc3 = adjustToUTC3(finishDate);

    const taskExists = await Task.findOne({ where: { id: taskId, userId: req.user.id } });
    if (!taskExists) return res.status(404).json({ errors: ["Tarefa não encontrada."] });

    await Task.update(
      {
        nome: nameTask,
        categoria: category,
        descricao: description,
        status,
        dataInicio: initDate,
        dataFim: finishDate,
        prioridade: priority
      },
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

    const now = new Date();
    now.setHours(now.getHours() - now.getTimezoneOffset() / 60 + 3);

    const updatedTasks = tasks.map(task => {
      const finishDate = new Date(task.dataFim);

      const isLate = finishDate < now && task.status !== "Concluída";

      return {
        ...task.toJSON(),
        dataFim: finishDate,
        status: isLate ? "Atrasado" : task.status
      };
    });

    return res.status(200).json({ tasks: updatedTasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
};

const getTaskById = async (req, res) => {

  const { taskId } = req.params;

  if (!taskId) {
    return res.status(400).json({ errors: ["ID da tarefa não fornecido."] });
  }

  try {

    const task = await Task.findOne({ where: { id: taskId, userId: req.user.id } });

    if (!task) {
      return res.status(400).json({ errors: ["Tarefa não encontrada."] })
    }

    return res.status(200).json({ task });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro interno no servidor."] });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
};
