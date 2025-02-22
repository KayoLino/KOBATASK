const cron = require("node-cron");
const Task = require("../model/Task");

const updateTaskStatuses = async () => {
  try {
    console.log("Executando atualização de tarefas...");

    const tasks = await Task.findAll();
    const now = new Date();
    now.setHours(now.getHours() - now.getTimezoneOffset() / 60 + 3);

    const tasksToUpdate = [];

    for (const task of tasks) {
      const initDate = new Date(task.dataInicio);
      const finishDate = new Date(task.dataFim);
      let newStatus = task.status;

      if (now < initDate && task.status !== "Pendente") {
        newStatus = "Pendente";
      } else if (now >= initDate && task.status !== "Concluída") {
        newStatus = "Em andamento";
      }

      if (finishDate < now && task.status !== "Concluída") {
        newStatus = "Atrasado";
      }

      if (newStatus !== task.status) {
        tasksToUpdate.push({ id: task.id, status: newStatus });
      }
    }

    if (tasksToUpdate.length > 0) {
      await Promise.all(
        tasksToUpdate.map(({ id, status }) =>
          Task.update({ status }, { where: { id } })
        )
      );
      console.log(`Atualização concluída: ${tasksToUpdate.length} tarefas modificadas.`);
    } else {
      console.log("Nenhuma atualização necessária.");
    }
  } catch (error) {
    console.error("Erro ao atualizar tarefas:", error);
  }
};

cron.schedule("*/1 * * * *", updateTaskStatuses);

module.exports = { updateTaskStatuses };
