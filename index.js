const server = require('./config/server');

port = 21063

server.listen(port, () => {
    console.log(`Online na porta: ${port}`)
})