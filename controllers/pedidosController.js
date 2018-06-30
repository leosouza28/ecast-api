const PedidosModel = require('../models/pedidosModel')

const Pedidos = {
    novoPedidoDinheiro: (req, res, next) => {
        let dados = {
            total_bruto: req.body.total_bruto,
            taxa_entrega: req.body.taxa_entrega,
            total_liquido: req.body.total_liquido,
            usuario_id: req.headers.userid,
            estabelecimento_id: req.body.estabelecimento_id,
            endereco_id: req.body.endereco_id,
            troco: req.body.troco,
            status: 0,
            pagamento: 'DINHEIRO'
        }
        let produtos = req.body.produtos
        PedidosModel.novoPedidoDinheiro(dados)
            .then(results => {
                let idPedido = results.insertId
                produtos.map((item, index) => {
                    PedidosModel.inserirProduto(item)
                        .then(results => {
                            let idProdInserido = results.insertId
                            PedidosModel.atualizarPedidosHasProdutos(idPedido, idProdInserido)
                                .then(results => {
                                    console.log('Produtos atualizados e vinculados.')
                                })
                                .catch(err => {
                                    console.log('Falha ao atualizar os produtos, o pedido foi gerado.')
                                })
                        })
                        .catch(err => {
                            console.log('Falha ao inserir item: ', item)
                        })
                })
                res.send(200, { msg: 'OK' })
            })
            .catch(err => {
                res.send(400, { msg: 'Falha ao gerar pedido!' })
                console.log('Erro', err)
            })
    },
    listarPedidosPorUsuario: (req, res, next) => {
        let userId = req.headers.userid;
        PedidosModel.listarPedidosPorUsuario(userId)
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Erro!' })
            })
    },
    listarDetalhesPedido: (req, res, next) => {
        let idPedido = req.params.id
        PedidosModel.listarDetalhesPedidos(idPedido)
            .then(results => {
                let infoPedido = results;
                PedidosModel.listarProdutosPedido(idPedido)
                    .then(data => {
                        let produtosPedido = data
                        res.send(200, { infoPedido, produtosPedido })
                    })
                    .catch(err => {
                        console.log('Falha ao recuperar')
                        res.send(400, { erro: 'Erro' })
                    })
            })
            .catch(err => {
                res.send(400, { erro: 'Erro' })
                console.log(err)
            })
    },
    listarPedidosPorEstabelecimento: (req, res, next) => {
        let idEstabelecimento = req.params.id
        PedidosModel.listarPedidosPorEstabelecimento(idEstabelecimento)
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                res.send(400, err)
            })
    }
}

module.exports = Pedidos