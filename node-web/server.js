const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end('Hellow World \n');
})

server.listen(8001)
console.log('Servidor en la url: http://localhost:8001')