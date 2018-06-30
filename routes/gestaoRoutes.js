const GestaoController = require('../controllers/gestaoController');

const gestaoRoutes = (server) => {
    server.get('/v1/gestao/meuEstabelecimento', GestaoController.verificarEstabelecimento);
    server.get('/v1/gestao/dadosEstabelecimento', GestaoController.dadosEstabelecimento);
    server.get('/v1/gestao/getProdutosEstabelecimento', GestaoController.selecionarProdutos);
    server.get('/v1/gestao/selecionarTiposProduto', GestaoController.selecionarTiposProduto);
}

console.log('Rota de gestao iniciada!')

module.exports = gestaoRoutes;