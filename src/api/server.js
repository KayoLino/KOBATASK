const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const setupDB = require("./db/databaseConfig");
const router = require("./routes/Router");


const createServer = async () => {

    await setupDB();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    app.use(cookieParse());

    app.use(router);

    return app;
}

module.exports = createServer;