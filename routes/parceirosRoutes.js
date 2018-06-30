const ParceirosController  = require('../controllers/parceirosController');

const usuarioRoutes = (server) => {
    server.get('/v1/parceiros/listar', ParceirosController.listarParceiros);
    server.get('/v1/parceiros/detalhar/:id', ParceirosController.detalharParceiros);
    server.get('/v1/parceiros/listar/produtos/:id', ParceirosController.listarProdutos);
}

console.log('Rota de parceiros iniciada!')

module.exports = usuarioRoutes;