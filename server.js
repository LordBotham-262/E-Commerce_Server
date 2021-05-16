const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
