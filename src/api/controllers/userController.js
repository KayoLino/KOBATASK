const jwt = require("jsonwebtoken");
const User = require("../model/User");

const bcrypt = require("bcrypt");

const fs = require("fs");
const path = require("path");


const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({ errors: ["Erro interno ao obter perfil."] });
  }
};

const updateUserProfile = async (req, res) => {

  try {
    const { nome, email, senhaAtual, novaSenha } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado."] });
    }

    let imagem_perfil = user.imagem_perfil;

    if (req.file) {
      imagem_perfil = `/uploads/profile_images/${req.file.filename}`;

      if (user.imagem_perfil && fs.existsSync(path.join(__dirname, "..", user.imagem_perfil))) {
        fs.unlinkSync(path.join(__dirname, "..", user.imagem_perfil));
      }
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ errors: ["E-mail já cadastrado."] });
      }
    }

    let hashedPassword = user.senha;

    if (senhaAtual && novaSenha) {
      const senhaAtualFormatada = Array.isArray(senhaAtual) ? senhaAtual[0] : senhaAtual;

      const isPasswordCorrect = await bcrypt.compare(senhaAtualFormatada, user.senha);
      if (!isPasswordCorrect) {
        return res.status(400).json({ errors: ["Senha atual incorreta."] });
      }

      hashedPassword = await bcrypt.hash(novaSenha, 10);
    }

    await user.update({ nome, email, senha: hashedPassword, imagem_perfil });

    return res.json({ message: "Perfil atualizado com sucesso.", user });

  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res.status(500).json({ errors: ["Erro interno ao atualizar perfil."] });
  }
};

module.exports = { getUserProfile, updateUserProfile };