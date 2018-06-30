const UsuarioController = require('../controllers/usuarioController');
const auth = require('../config/auth')

const usuarioRoutes = (server) => {
    server.get('/v1/private/usuario', auth.verificarToken, UsuarioController.selecionarTodos)
    server.get('/v1/public/usuario/selecionarEnderecos', UsuarioController.selecionarEnderecos)
    server.post('/v1/public/usuario/novoCliente', UsuarioController.novoCliente)
    server.post('/v1/public/usuario/login', UsuarioController.login)
    server.post('/v1/public/usuario/novoEndereco', UsuarioController.novoEndereco)
}

console.log('Rota de usuário iniciada!')

module.exports = usuarioRoutes;