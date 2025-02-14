const jwt = require("jsonwebtoken");
const RefreshToken = require("../model/RefreshToken");
const User = require("../model/User");

const generateToken = (userId, username) => {
  return jwt.sign({ id: userId, name: username }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.RefreshToken;

    if (!refreshToken) {
      return res.status(401).json({ errors: ["RefreshToken não encontrado."] });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ errors: ["Usuário não encontrado."] });
    }

    const refreshTokenRecord = await RefreshToken.findOne({ where: { userId: user.id, token: refreshToken } });

    if (!refreshTokenRecord) {
      return res.status(401).json({ errors: ["RefreshToken inválido."] });
    }

    const newAccessToken = generateToken(user.id, user.nome);

    res.cookie("AccessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "AccessToken atualizado com sucesso.",
      user: {
        id: user.id,
        nome: user.nome,
        img: user.imagem_perfil,
      },
    });
  } catch (error) {
    console.error("Erro ao tentar atualizar o AccessToken:", error);
    return res.status(500).json({ errors: ["Erro interno ao tentar atualizar o AccessToken."] });
  }
};

module.exports = {
  refreshAccessToken,
};
