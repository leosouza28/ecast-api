const UsuarioModel = require('../models/usuarioModel');
const auth = require('../config/auth')

const Usuario = {
    login: (req, res, next) => {
        let dados = {
            email: req.body.email,
            senha: req.body.senha
        }
        UsuarioModel.login(dados)
            .then(results => {
                return results[0]
            })
            .then(user => {
                // res.send(200, user)
                if (user.tipo == 999) {
                    auth.gerarToken(user)
                        .then(token => {
                            let data = {
                                id: user.id,
                                email: user.email,
                                nome: user.nome,
                                tipo: user.tipo,
                                token: token
                            }
                            res.send(200, data)
                        })
                        .catch(err => {
                            res.send(400, { erro: 'Falha ao gerar sessão.' })
                        })
                } else {
                    auth.gerarToken(user)
                        .then(token => {
                            let data = {
                                id: user.id,
                                email: user.email,
                                nome: user.nome,
                                tipo: user.tipo,
                                estabelecimento: user.estabelecimento,
                                token: token
                            }
                            res.send(200, data)
                        })
                        .catch(err => {
                            res.send(400, { erro: 'Falha ao gerar sessão.' })
                        })
                }
            })
            .catch(err => {
                res.send(400, { erro: 'Usuário não identificado.' })
            })
    },
    novoCliente(req, res, next) {
        let dados = req.body
        UsuarioModel.verificarEmail(dados.email)
            .then(results => {
                if (results.length == 0) {
                    UsuarioModel.novoCliente(dados)
                } else {
                    res.send(400, { erro: 'E-mail já existe na base de dados!' })
                }
            })
            .catch(err => {
                res.send(400, { erro: 'Estamos passando por instabilidades!' })
            })
    },
    selecionarTodos(req, res, next) {
        UsuarioModel.selecionarTodos()
            .then(results => {
                res.send(200, results)
            }).catch(err => {
                res.send(400, { erro: 'Erro na requisição' })
            })
    },
    selecionarEmail(req, res, next) {
    },
    novoEndereco(req, res, next) {
        let userId = req.headers.userid
        let dados = req.body;
        UsuarioModel.inserirNovoEndereco(dados)
            .then(infoRow => {
                let inserido = infoRow.insertId
                UsuarioModel.refreshUserHasEndereco(inserido, userId)
                    .then(results => {
                        console.log(results)
                        res.send(200, { msg: 'Inserido e atualizado com sucesso!' })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(400, { erro: 'Ocorreu um erro ao atualizar as tabelas.' })
                    })
            })
            .catch(err => {
                console.log(err)
                res.send(400, { msg: 'Ocorreu um erro!' })
            })
    },
    selecionarEnderecos(req, res, next) {
        let userId = req.headers.userid
        if (userId != null) {
            UsuarioModel.selecionarEnderecos(userId)
                .then(results => {
                    res.send(200, results)
                })
                .catch(err => {
                    res.send(400, err)
                })
        } else {
            res.send(400, { msg: 'Informe um cliente!' })
        }
    }
}

module.exports = Usuario;