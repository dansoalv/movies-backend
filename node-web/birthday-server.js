const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/birthday") {
    let body = [];
    let daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const birthday = Buffer.concat(body).toString();
        const date = new Date(birthday);
        res.end('El día que naciste fue: ' + daysWeek[date.getDay()]);
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8002);
console.log("Servidor en la url: http://localhost:8002");
