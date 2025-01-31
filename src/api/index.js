
const createServer = require("./server");
require("dotenv").config();

const app = createServer();

app.then((server) => {
    server.listen(process.env.PORT, () => {
        console.log(`Executando servidor na porta ${process.env.PORT}`);
    });
});