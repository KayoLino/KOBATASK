const Notification = require("../model/Notification");

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) return res.status(404).json({ error: "Notificação não encontrada" });

    await notification.update({ ler: true });
    res.json({ message: "Notificação marcada como lida" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar notificação" });
  }
};

module.exports = { getUserNotifications, markNotificationAsRead };
