const restify = require('restify');
const server = restify.createServer();
const cors = require('cors')

const usuarioRoutes = require('../routes/usuarioRoutes')
const parceirosRoutes = require('../routes/parceirosRoutes')
const pedidosRoutes = require('../routes/pedidosRoutes')
const gestaoRoutes = require('../routes/gestaoRoutes')
const db = require('./db');

server.use(cors())
server.use(restify.plugins.bodyParser());

function unknownMethodHandler(req, res, next) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'empresa', 'token', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization']; // added Origin & X-Requested-With & **Authorization**

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        return res.send(200);
    }
    else {
        res.status(400);
        return res.json({ 'msg': 'Estamos passando por instabilidades' });
    }
}

server.on('MethodNotAllowed', unknownMethodHandler);

server.use((req, res, next) => {

    // let token = req.headers['token'];
    // let token = req.body['token'] || req.query.token || req.headers['token'] || req.params.token;
    console.log(`${req.getRoute().method} ${req.getRoute().path} ${res.statusCode}`)
    // res.header('Access-Control-Allow-Origin', '')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, empresa, Accept, token, enctype ,count,authorization')
    if (req.method.toUpperCase() === 'OPTIONS') {
        res.sendStatus(200)
        next()
    } else {
        next()
    }
})
usuarioRoutes(server)
parceirosRoutes(server)
pedidosRoutes(server)
gestaoRoutes(server)

module.exports = server;