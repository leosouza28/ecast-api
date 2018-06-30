const db = require('../config/db');

const Pedidos = {
    novoPedidoDinheiro: (dados) => {
        let sql = `INSERT INTO pedido (
                            total_bruto, taxa_entrega, total_liquido, status, 
                            usuario_id, estabelecimento_id, endereco_id, troco, 
                            pagamento)
                            VALUES (
                                '${dados.total_bruto}','${dados.taxa_entrega}','${dados.total_liquido}','${dados.status}',
                                '${dados.usuario_id}','${dados.estabelecimento_id}','${dados.endereco_id}','${dados.troco}',
                                '${dados.pagamento}'
                            )`;
        return db.execSQL(sql)
    },
    inserirProduto: (dados) => {
        let sql = `INSERT INTO produtos (
                        nome, valor, obs, qtd, embalagem)
                            VALUES (
                            '${dados.nome}','${dados.valor}','${dados.obs}','${dados.qtd}','${dados.embalagem}')`
        return db.execSQL(sql)
    },
    atualizarPedidosHasProdutos: (idPedido, idProduto) => {
        let sql = `INSERT INTO produtos_has_pedidos (
                            pedido_id, produtos_id) 
                            VALUES ('${idPedido}','${idProduto}')`
        return db.execSQL(sql)
    },
    listarPedidosPorUsuario: (idUser) => {
        let sql = `SELECT PED.id, PED.total_bruto, PED.status, PED.pagamento, COUNT(PRODS.id) itens, 
        EST.nome, PED.dt_criado
        FROM pedido as PED, produtos_has_pedidos as PHP, produtos as PRODS, estabelecimento as EST
        WHERE PHP.pedido_id = PED.id AND PHP.produtos_id = PRODS.id 
        AND PED.estabelecimento_id = EST.id AND PED.usuario_id = ${idUser} GROUP BY (PED.id) ORDER BY dt_criado DESC`
        return db.execSQL(sql)
    },
    listarDetalhesPedidos: (idPedido) => {
        let sql = `SELECT p.id id_pedido, p.total_bruto, p.taxa_entrega, p.total_liquido, p.troco, p.pagamento, p.status,
                            u.nome, u.email, u.tel, e.cep, e.endereco, e.complemento, e.referencia, e.numero, e.cidade, e.estado, e.bairro
                            FROM pedido as p, usuario as u, endereco as e
                            WHERE p.usuario_id = u.id AND e.id = p.endereco_id AND p.id = '${idPedido}'`
        return db.execSQL(sql)
    },
    listarProdutosPedido: (idPedido) => {
        let sql = `SELECT p.id, p.nome, p.valor, p.obs, p.qtd, p.embalagem
                            FROM produtos as p, pedido as ped, produtos_has_pedidos as php
                            WHERE ped.id = php.pedido_id AND p.id = php.produtos_id AND ped.id = '${idPedido}'`
        return db.execSQL(sql)
    },
    listarPedidosPorEstabelecimento: (idEstabelecimento) => {
        let sql = `SELECT DISTINCT 
                        p.id, p.dt_criado, p.total_bruto, p.status, p.pagamento, u.nome 
                        FROM pedido, pedido as p, usuario as u 
                        WHERE p.usuario_id = u.id 
                        AND p.estabelecimento_id = '${idEstabelecimento}'
                        AND p.status != 4 ORDER BY p.dt_criado DESC`
        return db.execSQL(sql)
    }
}

module.exports = Pedidos