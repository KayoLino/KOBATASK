const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const setupDB = require("./db/databaseConfig");
const router = require("./routes/Router");


const createServer = async () => {

    await setupDB();

    require("./services/taskScheduler");

    const app = express();
    const path = require("path");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    console.log("Servindo arquivos estáticos de:", path.resolve("uploads"));
    app.use(cookieParse());

    app.use(router);

    return app;
}

module.exports = createServer;