const sequelize = require("./database");

const setup = async () => {
    return sequelize.sync();
}

module.exports = setup;
