const server = require('./config/server');

port = 443

server.listen(port, () => {
    console.log(`Online na porta: ${port}`)
})