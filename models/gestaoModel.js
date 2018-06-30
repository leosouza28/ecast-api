const db = require('../config/db');

const Gestao = {
    listarEstabelecimento(estabelecimentoId) {
        let sql = `SELECT id, nome FROM estabelecimento WHERE id=${estabelecimentoId}`
        return db.execSQL(sql)
    },
    puxarDadosEstabelecimento(estabelecimentoId) {
        let sql = `SELECT nome, razao, descricao, cep, endereco, numero, complemento, tel1, email, status, taxa_entrega
                        FROM estabelecimento WHERE id=${estabelecimentoId}`
        return db.execSQL(sql)
    },
    puxarProdutos(estabelecimentoId) {
        let sql = `SELECT p.id, p.nome, p.descricao pro_desc, p.valor, p.status, p.embalagem, p.criado, tp.descricao tipo_desc
                        FROM produto as p, tipo_produto as tp
                        WHERE p.tipo_produto_id = tp.id AND estabelecimento_id =${estabelecimentoId}`
        return db.execSQL(sql)
    },
    selecionarTiposProduto: () => {
        let sql = `SELECT * FROM tipo_produto`
        return db.execSQL(sql)
    }
}

module.exports = Gestao