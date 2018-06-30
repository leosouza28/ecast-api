const GestaoModel = require('../models/gestaoModel');
const auth = require('../config/auth')

const Gestao = {
    verificarEstabelecimento: (req, res, next) => {
        let estId = req.headers.estabelecimento;
        GestaoModel.listarEstabelecimento(estId)
            .then(results => {
                return results[0]
            })
            .then(resultsJson => {
                res.send(200, resultsJson)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Erro!' })
            })
    },
    dadosEstabelecimento: (req, res, next) => {
        let estId = req.headers.estabelecimento;
        GestaoModel.puxarDadosEstabelecimento(estId)
            .then(results => {
                return results[0]
            })
            .then(resultsJson => {
                res.send(200, resultsJson)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { msg: 'Erro na consulta' })
            })
    },
    selecionarProdutos: (req, res, next) => {
        let estId = req.headers.estabelecimento
        GestaoModel.puxarProdutos(estId)
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Erro na consulta' })
            })
    },
    selecionarTiposProduto: (req, res, next) => {
        GestaoModel.selecionarTiposProduto()
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                res.send(400, { msg: 'Erro ao consultar' })
            })
    }
}

module.exports = Gestao