const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");
const RefreshToken = require("../model/RefreshToken ");

const generateToken = (userId, username) => {
    return jwt.sign({ id: userId, name: username }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const generateRefreshToken = (userId, username) => {
    return jwt.sign({ id: userId, name: username }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const register = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(422).json({ errors: ["E-mail já cadastrado."] });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nome: name,
            email: email,
            senha: passwordHash
        });

        if (!newUser) {
            res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
            return;
        }
        res.status(200).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
        console.log("Ocorreu algum erro: ", error);
        return res.status(422).json({ errors: ["Algum erro detectado.", error] });
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(422).json({ errors: ["Usuário não encontrado."] });
        }

        if (!(await bcrypt.compare(password, user.senha))) {
            return res.status(422).json({ errors: ["Senha incorreta!"] });
        }

        const token = generateToken(user.id, user.nome);
        const refreshToken = generateRefreshToken(user.id, user.nome);

        await RefreshToken.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });


        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: "strict",
        });

        res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Login realizado com sucesso.", user: {
                id: user.id,
                nome: user.nome,
                img: user.imagem_perfil,
            },
        });

    } catch (error) {
        console.log("Ocorreu algum erro: ", error);
        return res.status(422).json({ errors: ["Erro ao fazer login."] });
    }
}

const logout = async (req, res) => {

    try {
        const refreshToken = req.cookies.RefreshToken;

        if (refreshToken) {
            await RefreshToken.destroy({ where: { token: refreshToken } });

            res.clearCookie("AccessToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production',
            });

            res.clearCookie("RefreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production',
            });

            return res.status(200).json({ message: "Logout realizado com sucesso." });
        }

        return res.status(400).json({ errors: "Nenhum token de refresh encontrado." });

    } catch (error) {
        console.log("Erro ao realizar logout: " + error);
        return res.status(500).json({ errors: "Erro interno no servidor." });
    }
}

const authCheck = async (req, res) => {

    const token = req.cookies.AccessToken;

    if (!token) {
        return res.status(401).json({ errors: "Não autenticado." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Autenticado.", user: decoded })
    } catch (error) {
        return res.status(401).json({ errors: "Token inválido ou expirado." });
    }
}

module.exports = {
    register,
    login,
    logout,
    authCheck,
}