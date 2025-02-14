const upload = require("../utils/multerConfig");

const multerMiddleware = upload.single("imagem_perfil");

module.exports = multerMiddleware;