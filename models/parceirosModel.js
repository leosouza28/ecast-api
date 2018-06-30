const db = require('../config/db');

const Parceiros = {
    listarParceiros() {
        let sql = `SELECT est.id, est.nome, est.faixa_preco, cat.tipo, est.avaliacao, est.logo
                        FROM estabelecimento as est JOIN categoria as cat JOIN avaliacao as a
                        WHERE est.categoria_id = cat.id
                        GROUP BY est.id`
        return db.execSQL(sql)
    },
    detalhesParceiro(id) {
        let sql = `SELECT est.id, est.nome, est.descricao, est.tel1, est.faixa_preco, cat.tipo, est.taxa_entrega, est.formas_pagamento
                        FROM estabelecimento as est, categoria as cat 
                        WHERE cat.id = est.categoria_id AND est.id = ${id}`
        return db.execSQL(sql)
    },
    listarProdutos(id) {
        let sql = `SELECT p.id id_produto, p.nome, p.descricao desc_produto, p.valor, p.embalagem, p.estabelecimento_id, tp.id id_tipo, tp.descricao title
                        FROM produto as p, estabelecimento as est, tipo_produto as tp
                        WHERE p.estabelecimento_id = est.id 
                        AND p.tipo_produto_id = tp.id 
                        AND p.estabelecimento_id = ${id}`
        return db.execSQL(sql)
    }
}

module.exports = Parceiros