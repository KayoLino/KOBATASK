const { body } = require("express-validator");

const updateValidation = () => {
  return [
    body("nome")
      .isLength({ min: 4 })
      .withMessage("O nome precisa ter no mínimo 4 caracteres."),

    body("email")
      .isEmail()
      .withMessage("Insira um e-mail válido."),

    body("senhaAtual")
      .notEmpty()
      .withMessage("A senha atual é obrigatória."),

    body("novaSenha")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A nova senha precisa ter no mínimo 5 caracteres.")
  ];
};

module.exports = {
  updateValidation
};
