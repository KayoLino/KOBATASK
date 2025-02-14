const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authGuard = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      return res.status(401).json({ errors: ["Acesso negado!"] });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.scope("safe").findByPk(verified.id);

    if (!req.user) {
      return res.status(401).json({ errors: ["Usuário não encontrado."] });
    }

    next();
  } catch (error) {
    return res.status(401).json({ errors: ["Token inválido ou expirado."] });
  }
};

module.exports = authGuard;
