const server = require('./config/server');

port = 21083

server.listen(port, () => {
    console.log(`Online na porta: ${port}`)
})