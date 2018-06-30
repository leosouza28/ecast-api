const PedidosController = require('../controllers/pedidosController');

const pedidosRoutes = (server) => {
    // User final --
    server.get('/v1/pedidos/listarPedidosPorUsuario', PedidosController.listarPedidosPorUsuario)
    server.get('/v1/pedidos/listarDetalhesPedido/:id', PedidosController.listarDetalhesPedido)
    server.post('/v1/pedidos/novoDinheiro', PedidosController.novoPedidoDinheiro);
    // Gestao --
    server.get('/v1/pedidos/listarPedidosPorEstabelecimento/:id', PedidosController.listarPedidosPorEstabelecimento)
}

console.log('Rota de parceiros iniciada!')

module.exports = pedidosRoutes;