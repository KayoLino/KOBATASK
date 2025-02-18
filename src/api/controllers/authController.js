const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../model/User");
const RefreshToken = require("../model/RefreshToken");

const generateToken = (userId, username) => {
    return jwt.sign({ id: userId, name: username }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

const generateRefreshToken = (userId, username) => {
    return jwt.sign({ id: userId, name: username }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ errors: ["As senhas não coincidem."] });
        }

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
            return res.status(500).json({ errors: ["Erro ao criar usuário."] });
        }

        return res.status(201).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
        console.error("Erro no registro:", error);
        return res.status(500).json({ errors: ["Erro interno no servidor."] });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ errors: ["Usuário ou senha incorretos."] });
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ errors: ["Usuário ou senha incorretos."] });
        }

        const token = generateToken(user.id, user.nome);
        const refreshToken = generateRefreshToken(user.id, user.nome);

        const refreshTokenRecord = await RefreshToken.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await user.update({
            refresh_token_id: refreshTokenRecord.id,
        });


        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
        });

        res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "None",
        });

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            user: {
                id: user.id,
                nome: user.nome,
                img: user.imagem_perfil,
            },
        });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ errors: ["Erro interno no servidor."] });
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.RefreshToken;

        if (refreshToken) {
            const refreshTokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });

            if (refreshTokenRecord) {
                const user = await User.findByPk(refreshTokenRecord.userId);
                await user.update({ refresh_token_id: null });

                await RefreshToken.destroy({ where: { token: refreshToken } });
            }

            res.clearCookie("AccessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });

            res.clearCookie("RefreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });

            return res.status(200).json({ message: "Logout realizado com sucesso." });
        }

        return res.status(400).json({ errors: ["Nenhum token de refresh encontrado."] });
    } catch (error) {
        console.error("Erro no logout:", error);
        return res.status(500).json({ errors: ["Erro interno no servidor."] });
    }
}


const authCheck = async (req, res) => {
    const token = req.cookies.AccessToken;

    if (!token) {
        return res.status(401).json({ errors: ["Não autenticado."] });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.scope("safe").findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ errors: ["Usuário não encontrado."] });
        }

        return res.status(200).json({
            message: "Autenticado.",
            user: {
                id: user.id,
                nome: user.nome,
                img: user.imagem_perfil,
            },
        });

    } catch (error) {
        return res.status(401).json({ errors: ["Token inválido ou expirado."] });
    }
};

module.exports = {
    register,
    login,
    logout,
    authCheck,
};
