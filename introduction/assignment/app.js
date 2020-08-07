const http = require("http");

const routes = require("../assignment/routes");

const server = http.createServer(routes);

server.listen(3000);
